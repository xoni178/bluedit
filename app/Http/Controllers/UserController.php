<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display specified user
     * 
     * @param string 
     */
    public function show(Request $request)
    {
        return response("<h1>HI!</h1>", 200, ["Content-type" => "text/html; charset=UTF-8"]);
    }
}
