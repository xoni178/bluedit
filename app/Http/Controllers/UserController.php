<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{
    public function index()
    {
        return view("components.pages.register");
    }
    /**
     * Display specified user
     * 
     * @param string 
     */
    public function show(Request $request, string $username)
    {

        try {

            $user = User::findOrFail($username);

            $posts = $user->posts()->withCount([
                "users AS upvote_count" => function (Builder $query) {
                    $query->where("vote_type", "UPVOTE");
                },
                "users AS downvote_count" => function (Builder $query) {
                    $query->where("vote_type", "DOWNVOTE");
                }
            ])->paginate(7);

            return response()->view("components.pages.user", ["user" => $user, "posts" => $posts], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {

            return response()->view("components.exceptions.not-found", ["name" => "user"], 404);
        }
    }

    public function showComments()
    {
        return response("<h1>comments</h1>");
    }
    public function showUpvotes()
    {
        return response("<h1>upvotes</h1>");
    }
    public function showDownvotes()
    {
        return response("<h1>downvotes</h1>");
    }


    public function create(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create($validated);

        Auth::login($user);

        return redirect("/");
    }
}
