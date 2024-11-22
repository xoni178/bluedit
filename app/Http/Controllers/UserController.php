<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//services
use App\Services\UserService;

class UserController extends Controller
{

    /**
     * Display specified user
     * 
     * @param string 
     */
    public function show(Request $request, string $username)
    {
        $userService = new UserService();

        try {
            $user = $userService->getUser($username);

            return view("components.pages.user", ["user" => $user]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {

            return view("components.exceptions.not-found", ["exception" => $err]);
        }
    }
}
