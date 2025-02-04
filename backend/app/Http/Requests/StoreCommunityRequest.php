<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\UserService;
use App\Exceptions\InvalidToken;

class StoreCommunityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (!$this->hasCookie("token")) return false;

        $tokenEntity = UserService::validateToken($this->cookie("token"));

        if ($tokenEntity === null) {
            throw new InvalidToken("Invalid token");
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            "name" => "required|string|unique:communities,name|min:1|max:255",
            "desc" => "required|string|min:1|max:65500",
            "icon" => "sometimes|image|mimes:jpeg,png,jpg|max:124",
            "banner" => "sometimes|image|mimes:jpeg,png,jpg|max:500",
        ];
    }

    public function messages()
    {
        return [
            // Messages for "name"
            "name.required" => "A name is required.",
            "name.unique" => "Community name already exists.",
            "name.string" => "The name must be a valid string.",
            "name.min" => "The name must be 1 or more characters.",
            "name.max" => "The name must not exceed 255 characters.",

            // Messages for "desc" 
            "desc.required" => "A body is required for a text post.",
            "desc.string" => "The body must be a valid string.",

            // Messages for "icon" 
            "icon.image" => "The uploaded icon must be an image.",
            "icon.mimes" => "The icon must be a file of type: jpeg, png, jpg.",
            "icon.max" => "The icon must not exceed 124 KB.",

            // Messages for "banner" 
            "banner.image" => "The uploaded banner must be an image.",
            "banner.mimes" => "The banner must be a file of type: jpeg, png, jpg.",
            "banner.max" => "The banner must not exceed 500 KB.",
        ];
    }
}
