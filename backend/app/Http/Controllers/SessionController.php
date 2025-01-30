<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSessionRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

use App\Exceptions\InvalidToken;
use App\Services\UserService;

class SessionController extends Controller
{

    public function store(StoreSessionRequest $request)
    {

        $request->validated();

        if (!User::where("email", $request->email)->exists()) {
            throw ValidationException::withMessages(["email" => "The email is incorrect."]);
        }
        $user = User::where("email", $request->email)->first();


        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(["password" => "The password is incorrect."]);
        }


        $user = User::where("email", $request->email)->first();
        $token = $user->createToken("token of " . $user->username);

        return response()->json(["username" => $user->username], 200)
            ->header('Content-Type', 'application/json')
            ->withCookie(cookie(
                'token',
                $token->plainTextToken,
                60 * 24 * 7,
                '/',
                null,
                false,
                true,
                false,
                'Strict'
            ));
    }

    public function destroy(Request $request)
    {
        if (!$request->hasCookie("token")) throw new InvalidToken("Token not found");

        $token = $request->cookie("token");

        $user = UserService::authenticateUser($token);

        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out'])->withCookie(cookie()->forget('token'));
    }
}
