<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Http\Requests\StoreCommunityRequest;
use App\Http\Requests\ShowCommunityRequest;
use App\Http\Resources\CommunityResource;
use Illuminate\Http\Request;
use App\Services\UserService;



use Illuminate\Contracts\Database\Eloquent\Builder;

use App\Http\Resources\PostResource;


class CommunityController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function subscriptions(Request $request)
    {
        //validate authentication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        if ($token) {
            $user = UserService::authenticateUser($token);

            $subscribedCommunities = $user->communities()->paginate(20);

            return CommunityResource::collection($subscribedCommunities);
        }
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
    public function show(ShowCommunityRequest $request, $community_name)
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
            ])->orderBy("created_at", "DESC")->paginate(5);

            if ($request->hasCookie("token")) {

                $token = request()->cookie("token");
                $user = UserService::authenticateUser($token);
                $community->isSubscribed = $user->communities()->where("name", $community->name)->exists();
            } else {
                $community->isSubscribed = false;
            }

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

    public function join(Request $request)
    {
        //validate authentication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);

        //validate community existence
        $validated = $request->validate([
            "community_name" => "required|string|exists:communities,name"
        ]);

        $isSubscriptied = $user->communities()->where("name", $validated["community_name"])->exists();

        if (!$isSubscriptied) $user->communities()->attach($validated["community_name"]);
    }
    public function leave(Request $request)
    {
        //validate authentication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);

        //validate community existence
        $validated = $request->validate([
            "community_name" => "required|string|exists:communities,name"
        ]);

        $isSubscriptied = $user->communities()->where("name", $validated["community_name"])->exists();

        if ($isSubscriptied) $user->communities()->detach($validated["community_name"]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        //
    }
}
