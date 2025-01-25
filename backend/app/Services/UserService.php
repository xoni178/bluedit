<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserService
{
    /**
     * Validate auth token
     * 
     * @param string $token
     * @return object|null
     */
    public static function validateToken($token): object|null
    {
        if (str_contains($token, "|")) {
            [$id, $token] = explode("|", $token);

            if (!is_numeric($id)) return null;
        } else {
            return null;
        }


        $tokenEntity = DB::table('personal_access_tokens')
            ->where('id', $id)->first();

        if ($tokenEntity === null) return null;

        if ($tokenEntity->token != hash('sha256', $token)) return null;

        return $tokenEntity;
    }
}
