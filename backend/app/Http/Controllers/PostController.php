<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;

use App\Exceptions\InvalidToken;
use App\Services\UserService;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostCommentResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //validate input data
        $validated = $request->validated();

        //validate authication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        if (!$token) throw new InvalidToken("Not Logged in", 401);

        $tokenEntity = UserService::validateToken($token);

        if ($tokenEntity === null) throw new InvalidToken("Invalid token");



        $user = User::findOrFail($tokenEntity->tokenable_id);

        //create post type
        if ($request->postable_type === "text_post") {
            $textPost = \App\Models\TextPost::create([
                "body" => $validated["body"],
            ]);
        } else if ($request->postable_type === "image_post") {

            $path = $request->file('image')->store('images', 'public');

            if ($path) {

                $imagePost = \App\Models\ImagePost::create([
                    "image_url" => "/storage/" . $path,
                ]);
            }
        } else if ($request->postable_type === "video_post") {
            $path = $request->file('video')->store('videos', 'public');

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
        try {
            $post = Post::FindOrFail($post_id);

            return new PostCommentResource(["post" => $post, "comments" => $post->comments]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {

            return response()->json(["error" => "Not found"],  404);
        }
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
