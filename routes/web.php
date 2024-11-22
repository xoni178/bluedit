<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('components.pages.home');
});


Route::group([], function () {
    Route::get("/users/{username}", [\App\Http\Controllers\UserController::class, "show"]);
    Route::get("/register", [\App\Http\Controllers\UserController::class, "create"]);
});

Route::group([], function () {
    Route::get("/create", [\App\Http\Controllers\PostController::class, "create"]);
});

Route::group([], function () {
    Route::get("/r/{community_name}", [\App\Http\Controllers\CommunityController::class, "show"]);
});
