<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\error;


Route::controller(\App\Http\Controllers\HomeController::class)->group(function () {
    Route::get("/", "index");
    Route::get("/search", "search");
});

Route::controller(\App\Http\Controllers\UserController::class)->group(function () {
    Route::get("/register",  "index");
    Route::get("/users/{username}", "show");
    Route::get("/users/{username}/comments",  "showComments");
    Route::get("/users/{username}/upvotes",  "showUpvotes");

    //post
    Route::post("/register",  "store");
});



Route::controller(\App\Http\Controllers\SessionController::class)->group(function () {
    Route::post("/login",  "store");
    Route::post("/logout",  "destroy");
});

Route::controller(\App\Http\Controllers\PostController::class)->group(function () {
    Route::post("/create", "store");

    Route::get("/posts/{post_id}", "show");
});

Route::controller(\App\Http\Controllers\CommunityController::class)->group(function () {
    Route::get("/r/{community_name}", "show");
});
