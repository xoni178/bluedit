<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSessionRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SessionController extends Controller
{
    public function create()
    {
        return response()->json(["invalid credetials"], 200);
    }

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

        return response()->json(["username" => $user->username, "currentAccessToken" => $token->accessToken], 200)
            ->header('Content-Type', 'application/json')
            ->withCookie(cookie('token', $user->currentAccessToken()));
    }

    public function destroy(Request $request)
    {
        if (!$request->hasCookie("token")) return;


        [$id, $token] = explode("|", $request->cookie("token"));

        $tokenEntity = DB::table('personal_access_tokens')
            ->where('id', $id)->first();

        if ($tokenEntity == null) return;

        if ($tokenEntity->token != hash('sha256', $token)) return;

        User::find($tokenEntity->tokenable_id)->tokens()->delete();

        return response()->json(['message' => 'Logged out'])->withCookie(cookie()->forget('token'));
    }
}
