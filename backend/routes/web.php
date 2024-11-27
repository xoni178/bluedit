<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\HomeController::class)->group(function () {
    Route::get('/', "index");
});





Route::controller(\App\Http\Controllers\SessionController::class)->group(function () {
    Route::get("/login", "create");
    Route::post("/login",  "store");
    Route::post("/logout",  "destroy");
});

Route::controller(\App\Http\Controllers\PostController::class)->group(function () {
    Route::get("/create", "index");

    Route::get("/posts/{post_id}/{slug?}", "show")->name("post.show");
});

Route::controller(\App\Http\Controllers\CommunityController::class)->group(function () {
    Route::get("/r/{community_name}", "show");
});
