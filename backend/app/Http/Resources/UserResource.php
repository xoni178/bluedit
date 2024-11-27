<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Database\Eloquent\Builder;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "username" => $this->username,
            "posts_karma" => $this->posts_karma,
            "comments_karma" => $this->comments_karma,
            "created_at" => $this->created_at->format("d:m:y"),
            "posts" => PostResource::collection($this->getPosts())
        ];
    }

    private function getPosts()
    {
        return $this->posts()->withCount([
            "users AS upvote_count" => function (Builder $query) {
                $query->where("vote_type", "UPVOTE");
            },
            "users AS downvote_count" => function (Builder $query) {
                $query->where("vote_type", "DOWNVOTE");
            }
        ])->limit(7)->get();
    }
}
