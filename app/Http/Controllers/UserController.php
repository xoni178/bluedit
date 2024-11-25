<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//services
use App\Services\ModelService;

class UserController extends Controller
{
    protected $modelService;

    public function __construct(ModelService $modelService)
    {
        $this->modelService = $modelService;
    }

    /**
     * Display specified user
     * 
     * @param string 
     */
    public function show(Request $request, string $username)
    {

        try {

            $user = $this->modelService->getEntity(\App\Models\User::class, $username);

            return response()->view("components.pages.user", ["user" => $user], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $err) {

            return response()->view("components.exceptions.not-found", ["name" => "user"], 404);
        }
    }

    public function create()
    {
        return view("components.pages.register");
    }
}
