<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ImagePost extends Model
{
    use HasFactory;

    protected $fillable = ['image_url'];

    public function post()
    {
        return $this->morphOne(Post::class, 'postable');
    }
}
