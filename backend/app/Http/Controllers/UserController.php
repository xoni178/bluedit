<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use App\Http\Resources\UserResource;

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

            return new UserResource($user);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {
            return response()->json(["404, User not found"], 404);
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
