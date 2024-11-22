<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('components.pages.home');
});


Route::group([], function () {
    Route::get("/users/{user}", [\App\Http\Controllers\UserController::class, "show"]);
});
