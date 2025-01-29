<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TextPost extends Model
{
    use HasFactory;

    protected $fillable = ['body'];

    public function post()
    {
        return $this->morphOne(Post::class, 'postable');
    }
}
