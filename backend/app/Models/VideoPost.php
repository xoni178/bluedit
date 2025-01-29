<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VideoPost extends Model
{
    use HasFactory;

    protected $fillable = ['video_url'];

    public function post()
    {
        return $this->morphOne(Post::class, 'postable');
    }
}
