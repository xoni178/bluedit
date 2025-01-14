<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    public function getCommentCountAttribute()
    {
        return $this->comments()->count();
    }

    public function getUpvoteCountAttribute()
    {
        return $this->users()->where('post_votes.vote_type', 'UPVOTE')->count();
    }

    public function getDownvoteCountAttribute()
    {
        return $this->users()->where('post_votes.vote_type', 'DOWNVOTE')->count();
    }

    public function user()
    {
        return $this->belongsTo(User::class, "username", "username");
    }

    public function users()
    {
        return $this->belongsToMany(User::class, "post_votes", "post_id", "username");
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, "post_id", "id");
    }

    public function community()
    {
        return $this->belongsTo(Community::class, "community_name", "name");
    }
}
