<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;


    public function user()
    {
        return $this->belongsToMany(\App\Models\User::class, "post_votes", "post_id", "username");
    }

    public function community()
    {
        return $this->belongsTo(Community::class, "community_name", "name");
    }
}
