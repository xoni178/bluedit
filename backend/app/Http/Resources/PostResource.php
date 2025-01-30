<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            "post_id" => $this->id,
            "username" => $this->username,
            "community_name" => $this->community_name,
            "upvote_count" => $this->upvote_count,
            "downvote_count" => $this->downvote_count,
            "title" => $this->title,
            "postable_type" => $this->postable_type,
            "content_resource" => $this->content_resource,
            "comment_count" => $this->comment_count,
            "created_at" => $this->created_at->format("d:m:y-h:m"),
            "community" => $this->community,
            "vote" => $this->vote,
        ];
    }
}
