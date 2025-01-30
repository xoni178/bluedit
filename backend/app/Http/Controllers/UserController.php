<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;

use App\Models\User;

use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\Models\Community;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display specified user
     * 
     * @param string 
     */
    public function show(Request $request, string $username)
    {

        try {

            $user = User::findOrFail($username);

            $posts = $user->posts()->paginate(10);

            return response()->json(["data" => [
                "user" => new UserResource($user),
                "posts" => PostResource::collection($posts)
            ]]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {
            return response()->json(["error" => "404, User not found"], 404);
        }
    }

    public function showComments($username)
    {
        $user = User::findOrFail($username);
        $comments = $user->comments()->paginate(10);

        return response()->json(["data" => [
            "user" => new UserResource($user),
            "comments" => CommentResource::collection($comments),
            "links" => [
                "next" => $comments->nextPageUrl()
            ]
        ]]);
    }
    public function showUpvotes($username)
    {
        $user = User::findOrFail($username);

        $upvotedComments = $user->comments_voted()
            ->select(
                DB::raw("'comment' as type"),
                "comments.id AS id",
                "comments.username AS username",
                "comments.post_id AS belongsTo",
                "comments.body AS title",
                "comments.created_at",
                "comments.updated_at",
                DB::raw("(SELECT count(*) FROM comment_votes WHERE comment_votes.comment_id = id AND comment_votes.vote_type = 'UPVOTE') AS upvote_count"),
                DB::raw("(SELECT count(*) FROM comment_votes WHERE comment_votes.comment_id = id AND comment_votes.vote_type = 'DOWNVOTE') AS downvote_count"),
                DB::raw("NULL AS comment_count"),
                DB::raw("NULL AS content_resource"),
                DB::raw("NULL AS postable_type")
            )->getQuery();

        $upvotedPosts = $user->posts_voted()
            ->select(
                DB::raw("'post' as type"),
                "posts.id AS id",
                "posts.username AS username",
                "posts.community_name AS belongsTo",
                "posts.title AS title",
                "posts.postable_type",
                DB::raw("
                CASE
                    WHEN posts.postable_type = 'text_post' THEN text_posts.body
                    WHEN posts.postable_type = 'image_post' THEN image_posts.image_url
                    WHEN posts.postable_type = 'video_post' THEN video_posts.video_url
                END AS content_resource
                "),
                "posts.created_at",
                "posts.updated_at",
                DB::raw("(SELECT count(*) FROM post_votes WHERE post_votes.post_id = id AND post_votes.vote_type = 'UPVOTE') AS upvote_count"),
                DB::raw("(SELECT count(*) FROM post_votes WHERE post_votes.post_id = id AND post_votes.vote_type = 'DOWNVOTE') AS downvote_count"),
                DB::raw("(SELECT count(*) FROM comments WHERE comments.post_id = id) AS comment_count")
            )->leftJoin('text_posts', function ($join) {
                $join->on('text_posts.id', '=', 'posts.postable_id')
                    ->where('posts.postable_type', '=', 'text_post');
            })
            ->leftJoin('image_posts', function ($join) {
                $join->on('image_posts.id', '=', 'posts.postable_id')
                    ->where('posts.postable_type', '=', 'image_post');
            })
            ->leftJoin('video_posts', function ($join) {
                $join->on('video_posts.id', '=', 'posts.postable_id')
                    ->where('posts.postable_type', '=', 'video_post');
            })->getQuery();





        $upvoted = DB::table(DB::raw("({$upvotedPosts->unionAll($upvotedComments)->toSql()}) as subquery"))
            ->mergeBindings($upvotedPosts->getQuery())
            ->paginate(10)
            ->through(function ($post) {
                $post->community = Community::findOrFail($post->belongsTo);
                return $post;
            });


        return response()->json(["data" => [
            "user" =>  new UserResource($user),
            "upvoted" => [
                "entity" => $upvoted->items()
            ],
            "links" => [
                "next" => $upvoted->nextPageUrl()
            ]
        ]]);
    }


    public function store(StoreUserRequest $request)
    {

        $validated = $request->validated();

        $user = User::create($validated);

        $token = $user->createToken("token of " . $user->username);

        return response()->json(["username" => $user->username])
            ->header('Content-Type', 'application/json')
            ->withCookie(cookie("token", $token->plainTextToken));
    }
}
