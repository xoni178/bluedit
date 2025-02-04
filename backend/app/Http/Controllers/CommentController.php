<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use App\Models\Post;


use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Services\UserService;

class CommentController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request, $post_id)
    {
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);

        $validated = $request->validated();

        //Validate and find post
        $post = Post::find($post_id);

        if (!$post) return response()->json(["error" => "Post Not found"],  404);

        //store comment
        $comment = Comment::create([
            "username" => $user->username,
            "post_id" => $post_id,
            "body" => $validated["body"]
        ]);

        return response()->json(["message" => "Comment created!", "comment" => new CommentResource($comment)],  201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
