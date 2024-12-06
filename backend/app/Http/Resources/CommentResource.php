<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "username" => $this->username,
            "post_id" => $this->post_id,
            "body" => $this->body,
            "created_at" => $this->created_at->format("d:m:y"),
            "upvotes" => $this->upvotes,
            "downvotes" => $this->downvotes
        ];
    }
}
