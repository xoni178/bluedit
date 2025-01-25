<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{

    use HasFactory;


    protected $primaryKey = "name";

    protected $keyType = 'string';

    public $incrementing = false;


    public function users()
    {
        return $this->belongsToMany(User::class, "community_user", "community_name", "username");
    }

    public function posts()
    {
        return $this->hasMany(Post::class, "community_name", "name");
    }
}
