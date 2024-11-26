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
        return response()->view("components.pages.login");
    }

    public function store(StoreSessionRequest $request)
    {

        $validated = $request->validated();

        if (!Auth::attempt($validated)) {
            throw ValidationException::withMessages([
                "email" => "invalid email",
                "password" => "invalid password"
            ]);
        }

        request()->session()->regenerate();

        return redirect("/");
    }

    public function destroy()
    {
        Auth::logout();

        return redirect("/");
    }
}
