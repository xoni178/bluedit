<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::group([], function () {
    Route::get("/u/users", [\App\Http\Controllers\UserController::class, "index"]);
});
