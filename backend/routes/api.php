<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\error;

Route::get('/user', function (Request $request) {

    if (Auth::check()) {
        error_log(Auth::user() . " is logged in!");
    }
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(\App\Http\Controllers\HomeController::class)->group(function () {
    Route::get('/', "index");
});

Route::controller(\App\Http\Controllers\UserController::class)->group(function () {
    Route::get("/register",  "index");
    Route::get("/users/{username}", "show");
    //Route::get("/users/{username}/comments", [\App\Http\Controllers\UserController::class, "showComments"]);
    Route::get("/users/{username}/upvotes",  "showUpvotes");
    Route::get("/users/{username}/downvotes", "showDownvotes");

    //post
    Route::post("/register",  "create");
});



Route::controller(\App\Http\Controllers\SessionController::class)->group(function () {
    Route::post("/login",  "store");
    Route::post("/logout",  "destroy");
});

Route::controller(\App\Http\Controllers\PostController::class)->group(function () {
    Route::get("/create", "index");

    Route::get("/posts/{post_id}/{slug?}", "show")->name("post.show");
})->middleware("auth:sanctum");

Route::controller(\App\Http\Controllers\CommunityController::class)->group(function () {
    Route::get("/r/{community_name}", "show");
});
