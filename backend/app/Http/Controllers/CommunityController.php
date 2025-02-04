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
use Illuminate\Support\Facades\Storage;

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
        //validate data
        $validated = $request->validated();

        $iconPath = null;
        $bannerPath = null;

        //store images
        if (array_key_exists("icon", $validated)) {
            $iconPath = $request->file("icon")->store("images/communities/icons", "public");
        }

        if (array_key_exists("banner", $validated)) {
            $bannerPath = $request->file("banner")->store("images/communities/banners", "public");
        }

        //Create community
        $community = Community::create([
            "name" => $validated["name"],
            "desc" => $validated["desc"],
            "icon_url" =>  $iconPath ? "/storage/" . $iconPath : null,
            "banner_url" => $bannerPath ? "/storage/" . $bannerPath : null
        ]);


        return response()->json(["community_name" => $community->name], 201);
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

    public function join(Request $request, $community_name)
    {
        //validate authentication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);

        //validate community existence
        $community = Community::where("name", $community_name)->exists();

        if ($community) {
            $isSubscriptied = $user->communities()->where("name", $community_name)->exists();

            if (!$isSubscriptied) $user->communities()->attach($community_name);
        } else {
            return response(["message" => "Community not found!"], 404);
        }
    }
    public function leave(Request $request, $community_name)
    {
        //validate authentication
        $token = $request->hasCookie("token") ? $request->cookie("token") : null;

        $user = UserService::authenticateUser($token);

        ///validate community existence
        $community = Community::where("name", $community_name)->exists();

        if ($community) {
            $isSubscriptied = $user->communities()->where("name", $community_name)->exists();

            if ($isSubscriptied) $user->communities()->detach($community_name);
        } else {
            return response(["message" => "Community not found!"], 404);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        //
    }
}
