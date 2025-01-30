<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "name" => $this->name,
            "description" => $this->desc,
            "icon_url" => $this->icon_url,
            "banner_url" => $this->banner_url,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
