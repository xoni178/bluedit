<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostCommentResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

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
        error_log("store post");
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
