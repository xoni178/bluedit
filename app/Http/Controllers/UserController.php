<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//services
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display specified user
     * 
     * @param string 
     */
    public function show(Request $request, string $username)
    {

        try {

            $user = $this->userService->getUser($username);

            return view("components.pages.user", ["user" => $user]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {

            return response()->view("components.exceptions.not-found", [], 404);
        }
    }
}
