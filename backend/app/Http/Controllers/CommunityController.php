<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Http\Requests\StoreCommunityRequest;
use App\Http\Requests\UpdateCommunityRequest;
use Illuminate\Support\Facades\Validator;

use Illuminate\Contracts\Database\Eloquent\Builder;

use App\Http\Resources\PostResource;


class CommunityController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

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
    public function store(StoreCommunityRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($community_name)
    {
        try {
            $community = Community::findOrFail($community_name);

            $posts = $community->posts()->withCount([
                "users AS upvote_count" => function (Builder $query) {
                    $query->where("vote_type", "UPVOTE");
                },
                "users AS downvote_count" => function (Builder $query) {
                    $query->where("vote_type", "DOWNVOTE");
                }
            ])->paginate(5);

            return response()
                ->json([
                    "community" => $community,
                    "posts" =>  PostResource::collection($posts),
                    "links" => [
                        "next" => $posts->nextPageUrl(),
                    ]

                ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {

            return response()->json(["message" => "Not found!"], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Community $community)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommunityRequest $request, Community $community)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        //
    }
}
