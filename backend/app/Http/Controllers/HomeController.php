<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommunityResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Community;
use App\Models\Post;
use App\Models\User;

use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Database\Query\Builder;

class HomeController extends Controller
{
    public function index()
    {
        $user = null;

        if (request()->hasCookie("token")) {
            $token = request()->cookie("token");
            $user = UserService::authenticateUser($token);
        }

        if ($user) {
            $randomSubscribedCommunities = $user->communities()->getQuery()->select("name", "desc", "icon_url", "banner_url", "created_at")->inRandomOrder();

            $randomCommunities = Community::select("name", "desc", "icon_url", "banner_url", "created_at")->whereDoesntHave("users", function ($query) use ($user) {
                $query->where("community_user.username", $user->username);
            })->inRandomOrder();

            $communities = $randomSubscribedCommunities->union($randomCommunities)->get();
        } else {
            $communities = Community::select("name", "desc", "icon_url", "banner_url", "created_at")->inRandomOrder()->get();
        }
        $communitiesNames = $communities->pluck("name");

        $total = Post::whereIn("community_name", $communitiesNames)->count();

        $randomOffset = mt_rand(0, max(0, $total - rand(0, 7)));

        $communities = $communities->keyBy('name');

        $posts = Post::whereIn("community_name", $communitiesNames)
            ->inRandomOrder()
            ->skip($randomOffset)
            ->paginate(5)
            ->through(function ($post) use ($communities) {
                $post->community = $communities[$post->community_name];
                return $post;
            });

        return PostResource::collection($posts);
    }

    public function search(Request $request)
    {
        $input = $request->all();


        if (array_key_exists("find", $input)) {
            $query = $input["find"];

            $validated = $request->validate([
                'find' => 'required|string|exists:communities,name'
            ]);

            $communities = Community::findOrFail($validated["find"]);

            return response()->json([
                "communities" => new CommunityResource($communities)
            ]);
        } else {

            $query =  $input["search"];

            $communities = Community::where("name", "LIKE", $query . "%")->limit(5)->get();

            $users = User::where("username", "LIKE", $query . "%")->limit(5)->get();


            return response()->json([
                "communities" => CommunityResource::collection($communities),
                "users" => UserResource::collection($users)
            ]);
        }
    }
}
