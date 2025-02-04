<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    protected $fillable = ["username", "post_id", "body"];


    public function getUpvotesAttribute()
    {
        return $this->users()->where('comment_votes.vote_type', 'UPVOTE')->count();
    }

    public function getDownvotesAttribute()
    {
        return $this->users()->where('comment_votes.vote_type', 'DOWNVOTE')->count();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, "comment_votes", "comment_id", "username");
    }

    public function post()
    {
        return $this->belongsTo(Post::class, "post_id", "id");
    }
}
