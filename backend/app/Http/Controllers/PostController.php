<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($post_id, $slug = null)
    {
        try {

            $post = Post::findOrFail($post_id)->withCount([
                "users AS upvote_count" => function (Builder $query) {
                    $query->where("vote_type", "UPVOTE");
                },
                "users AS downvote_count" => function (Builder $query) {
                    $query->where("vote_type", "DOWNVOTE");
                }
            ])->first();

            if ($slug === null || $slug !== str_replace(' ', '_', $post->title)) {


                return redirect()->route("post.show", [
                    "post_id" => $post->id,
                    "slug" =>  str_replace(' ', '_', $post->title)
                ]);
            }

            return response()->view("components.pages.post", ["post" => $post]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {

            return response()->view("components.exceptions.not-found", ["name" => "post"], 404);
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
