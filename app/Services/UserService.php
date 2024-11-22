<?php

namespace App\Services;

//Models
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserService
{

    public function getUser(string $username): Model
    {
        $user = User::findOrFail($username);

        return $user;
    }
}
