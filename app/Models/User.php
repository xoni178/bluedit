<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $primaryKey = "username";

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getPostsKarmaAttribute()
    {
        return $this->posts()
            ->join('post_votes', 'posts.id', '=', 'post_votes.post_id')
            ->where('post_votes.vote_type', 'UPVOTE')
            ->count();
    }

    public function getCommentsKarmaAttribute()
    {
        return $this->comments()
            ->join('comment_votes', 'comments.id', '=', 'comment_votes.comment_id')
            ->where('comment_votes.vote_type', 'UPVOTE')
            ->count();
    }

    public function communities()
    {
        return $this->belongsToMany(Community::class, "community_user", "username", "community_name");
    }

    public function posts()
    {
        return $this->hasMany(\App\Models\Post::class, "username", "username");
    }

    public function posts_voted()
    {
        return $this->belongsToMany(\App\Models\Post::class, "post_votes", "username", "post_id");
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, "username", "username");
    }
    public function comments_voted()
    {
        return $this->belongsToMany(Community::class, "comment_votes", "username", "comment_id");
    }
}
