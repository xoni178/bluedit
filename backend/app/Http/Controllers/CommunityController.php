<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Http\Requests\StoreCommunityRequest;
use App\Exceptions\InvalidToken;
use App\Services\UserService;

use App\Models\User;

use Illuminate\Contracts\Database\Eloquent\Builder;

use App\Http\Resources\PostResource;


class CommunityController extends Controller
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

    public function join()
    {
        $request = request();

        //validate authication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        if (!$token) throw new InvalidToken("Not Logged in", 401);

        $tokenEntity = UserService::validateToken($token);

        if ($tokenEntity === null) throw new InvalidToken("Invalid token");

        //validate community name existence
        $validated = $request->validate([
            "community_name" => "required|string|exists:communities,name"
        ]);

        $user = User::FindOrFail($tokenEntity->tokenable_id);

        $user->communities()->attach($validated["community_name"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        //
    }
}
