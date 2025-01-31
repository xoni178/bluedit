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

class HomeController extends Controller
{
    public function index()
    {
        $user = null;
        $total = Community::count();

        $randomOffset = mt_rand(0, max(0, $total - 10));
        $randomCommunities = Community::offset($randomOffset)->limit(10)->inRandomOrder();


        if (request()->hasCookie("token")) {
            $token = request()->cookie("token");
            $user = UserService::authenticateUser($token);
        }

        $communities = $randomCommunities->get();

        $randomValue = mt_rand(0, 2);
        $randomOffset = mt_rand(0, max(0, $total - 10));

        $communitiesByName = $communities->keyBy('name');

        $posts = Post::whereIn("community_name", $communities->pluck("name"))
            ->offset($randomOffset)
            ->limit($randomValue)
            ->inRandomOrder()
            ->orderBy("created_at", "DESC")
            ->paginate(5)
            ->through(function ($post) use ($communitiesByName, $user) {
                $post->community = $communitiesByName[$post->community_name];
                $post->vote = $user ? ($user->posts_voted()->where("post_id", $post->post_id)->first())?->vote_type : null;
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
