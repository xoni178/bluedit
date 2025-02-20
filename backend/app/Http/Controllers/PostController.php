<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Illuminate\Http\Request;
use App\Services\UserService;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\CommentResource;

class PostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //validate input data
        $validated = $request->validated();

        //validate authication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);


        //create post type
        if ($request->postable_type === "text_post") {
            $textPost = \App\Models\TextPost::create([
                "body" => $validated["body"],
            ]);
        } else if ($request->postable_type === "image_post") {

            $path = $request->file("image")->store("images/posts", "public");

            if ($path) {

                $imagePost = \App\Models\ImagePost::create([
                    "image_url" => "/storage/" . $path,
                ]);
            }
        } else if ($request->postable_type === "video_post") {
            $path = $request->file("video")->store("videos/posts", "public");

            if ($path) {
                $videoPost = \App\Models\VideoPost::create([
                    "video_url" => "/storage/" . $path,
                ]);
            }
        }

        //create post
        $post = Post::create([
            "username" => $user->username,
            "community_name" => $validated["community_name"],
            "title" => $validated["title"],
            "postable_id" => $textPost->id ?? $imagePost->id ?? $videoPost->id,
            "postable_type" => $request->postable_type,
        ]);

        return response()->json(["post_id" => $post->id], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($post_id)
    {

        $post = Post::find($post_id);

        if (!$post) return response()->json(["error" => "Not found"],  404);

        $comments = $post->comments()->orderBy("created_at", "DESC")->paginate(10);

        return response()->json([
            "post" => new PostResource($post),
            "comments" => CommentResource::collection($comments),
            "links" => [
                "next" => $comments->nextPageUrl()
            ]
        ]);
    }

    public function upvote(Request $request, $post_id)
    {
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);

        $post = Post::find($post_id);

        if (!$post) return response()->json(["error" => "Post Not found"],  404);


        $upvoteExists = $post->users()->where("users.username", $user->username)->where("post_votes.vote_type", "UPVOTE")->exists();

        if (!$upvoteExists) {

            $post->users()->syncWithoutDetaching([
                $user->username => ["vote_type" => "UPVOTE", "created_at" => now(), "updated_at" => now()]
            ]);
        } else {
            $post->users()->detach($user->username);
        }

        return response(null, 200);
    }

    public function downvote(Request $request, $post_id)
    {
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);

        $post = Post::find($post_id);

        if (!$post) return response()->json(["error" => "Post Not found"],  404);

        $downvoteExits = $post->users()->where("users.username", $user->username)->where("post_votes.vote_type", "DOWNVOTE")->exists();

        if (!$downvoteExits) {

            $post->users()->syncWithoutDetaching([
                $user->username => ["vote_type" => "DOWNVOTE", "created_at" => now(), "updated_at" => now()]
            ]);
        } else {
            $post->users()->detach($user->username);
        }

        return response(null, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
