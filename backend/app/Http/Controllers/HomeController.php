<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Community;
use App\Models\User;
use App\Models\Post;
use App\View\Components\pages\community as PagesCommunity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

class HomeController extends Controller
{
    public function index()
    {
        // $total = Community::count();

        // $randomOffset = mt_rand(0, max(0, $total - 10));
        // $randomCommunities = Community::offset($randomOffset)->limit(10)->inRandomOrder();



        // if (Auth::check()) {
        //     $total =  Auth::user()->communities()->count();

        //     $randomOffset = mt_rand(0, max(0, $total - 10));
        //     $randomSubscribedCommunities = Community::offset($randomOffset)->limit(10)->inRandomOrder();

        //     $randomCommunities = $randomCommunities->union($randomSubscribedCommunities);
        // }

        // $communities = $randomCommunities->get();

        // $randomValue = mt_rand(0, 2);
        // $randomOffset = mt_rand(0, max(0, $total - 10));

        // $posts = Post::whereIn("community_name", $communities->pluck("name"))
        //     ->offset($randomOffset)
        //     ->limit($randomValue)
        //     ->inRandomOrder()->withCount([
        //         "users AS upvote_count" => function (Builder $query) {
        //             $query->where("vote_type", "UPVOTE");
        //         },
        //         "users AS downvote_count" => function (Builder $query) {
        //             $query->where("vote_type", "DOWNVOTE");
        //         }
        //     ])->paginate(7);

        // return response()->view("components.pages.home", ["posts" => $posts]);

        return response()->json(["data" => "data"]);
    }
}
