<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSessionRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class SessionController extends Controller
{
    public function create()
    {
        return response()->json(["invalid credetials"], 200);
    }

    public function store(StoreSessionRequest $request)
    {

        $validated = $request->validated();

        if (!Auth::attempt($validated)) {
            return response()->json(["invalid credetials"], 401)->header('Content-Type', 'application/json');;
        }

        try {

            $user = \App\Models\User::where("email", $request->email)->first();
            $token = $user->createToken("token of " . Auth::user()->username);

            return response()->json([
                "username" => $user->username,
                "token" =>   $token->plainTextToken
            ])->header('Content-Type', 'application/json');;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {
            return response()->json(["404, User not found"], 404)->header('Content-Type', 'application/json');;
        }
    }

    public function destroy()
    {
        Auth::logout();

        return redirect("/");
    }
}
