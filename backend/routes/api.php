<?php

use Illuminate\Support\Facades\Route;


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

    Route::post("/posts/{post_id}/upvote", "upvote");
    Route::post("/posts/{post_id}/downvote", "downvote");

    Route::get("/posts/{post_id}", "show");

    Route::delete("/posts/{post_id}", "delete");
});

Route::controller(\App\Http\Controllers\CommunityController::class)->group(function () {
    Route::get("/r/{community_name}", "show");

    Route::get("/user/{username}/communities", "subscriptions");

    Route::post("user/community/{community_name}/join", "join");
    Route::post("user/community/{community_name}/leave", "leave");

    Route::post("/community/create", "store");
});

Route::controller(\App\Http\Controllers\CommentController::class)->group(function () {
    Route::post("/posts/{post_id}/comment", "store");
});
