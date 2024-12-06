<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;

use App\Models\Community;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $total = Community::count();

        $randomOffset = mt_rand(0, max(0, $total - 10));
        $randomCommunities = Community::offset($randomOffset)->limit(10)->inRandomOrder();



        if (Auth::check()) {
            $total =  Auth::user()->communities()->count();

            $randomOffset = mt_rand(0, max(0, $total - 10));
            $randomSubscribedCommunities = Community::offset($randomOffset)->limit(10)->inRandomOrder();

            $randomCommunities = $randomCommunities->union($randomSubscribedCommunities);
        }

        $communities = $randomCommunities->get();

        $randomValue = mt_rand(0, 2);
        $randomOffset = mt_rand(0, max(0, $total - 10));

        $posts = Post::whereIn("community_name", $communities->pluck("name"))
            ->offset($randomOffset)
            ->limit($randomValue)
            ->inRandomOrder()->paginate(10);

        return PostResource::collection($posts);
    }
}
