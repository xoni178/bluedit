<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use App\Http\Resources\UserResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        return view("components.pages.register");
    }
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
                "comments.body AS content",
                "comments.created_at",
                "comments.updated_at",
                DB::raw("(SELECT count(*) FROM comment_votes WHERE comment_votes.comment_id = id AND comment_votes.vote_type = 'UPVOTE') AS upvote_count"),
                DB::raw("(SELECT count(*) FROM comment_votes WHERE comment_votes.comment_id = id AND comment_votes.vote_type = 'DOWNVOTE') AS downvote_count"),
                DB::raw("NULL AS comment_count")
            )->getQuery();

        $upvotedPosts = $user->posts_voted()
            ->select(
                DB::raw("'post' as type"),
                "posts.id AS id",
                "posts.username AS username",
                "posts.community_name AS belongsTo",
                "posts.title AS content",
                "posts.created_at",
                "posts.updated_at",
                DB::raw("(SELECT count(*) FROM post_votes WHERE post_votes.post_id = id AND post_votes.vote_type = 'UPVOTE') AS upvote_count"),
                DB::raw("(SELECT count(*) FROM post_votes WHERE post_votes.post_id = id AND post_votes.vote_type = 'DOWNVOTE') AS downvote_count"),
                DB::raw("(SELECT count(*) FROM comments WHERE comments.post_id = id) AS comment_count")
            )->getQuery();

        $upvoted = DB::table(DB::raw("({$upvotedPosts->unionAll($upvotedComments)->toSql()}) as subquery"))
            ->mergeBindings($upvotedPosts->getQuery())
            ->paginate(10);

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


    public function create(StoreUserRequest $request)
    {

        $validated = $request->validated();

        $user = User::create($validated);


        if (!Auth::attempt($validated)) {
            return response()->json([
                "err" => "something went wrong"
            ]);
        }

        $token = $user->createToken("token of " . $user->username);

        return response()->json([
            "username" => $user->username,
            "token" =>  $token->plainTextToken
        ]);
    }
}
