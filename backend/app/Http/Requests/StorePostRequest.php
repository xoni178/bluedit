<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use App\Services\UserService;
use App\Exceptions\InvalidToken;
use Illuminate\Validation\ValidationException;

class StorePostRequest extends FormRequest
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
        if (!$this->has("postable_type") && !$this->is_string("postable_type")) {
            throw ValidationException::withMessages(["message" => "Something went wrong."]);
        }

        if ($this->postable_type === "text_post") {
            return [
                "title" => "required|string|max:255",
                "body" => "required|string",
                "community_name" => "required|string|exists:communities,name",
            ];
        }
        if ($this->postable_type === "image_post") {
            return [
                "title" => "required|string|max:255",
                "image" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
                "community_name" => "required|string|exists:communities,name",
            ];
        }
        if ($this->postable_type === "video_post") {
            return [
                "title" => "required|string|max:255",
                "video" => "required|mimes:mp4,ogx,oga,ogv,ogg,webm",
                "community_name" => "required|string|exists:communities,name",
            ];
        }

        throw ValidationException::withMessages(["message" => "Invalid post"]);
    }

    public function messages()
    {
        return [
            // Messages for "title"
            "title.required" => "A title is required.",
            "title.string" => "The title must be a valid string.",
            "title.max" => "The title must not exceed 255 characters.",

            // Messages for "body" 
            "body.required" => "A body is required for a text post.",
            "body.string" => "The body must be a valid string.",

            // Messages for "image" 
            "image.required" => "An image is required for an image post.",
            "image.image" => "The uploaded file must be an image.",
            "image.mimes" => "The image must be a file of type: jpeg, png, jpg, gif, svg.",
            "image.max" => "The image must not exceed 2 MB.",

            // Messages for "video" 
            "video.required" => "A video is required for a video post.",
            "video.mimes" => "The video must be a file of type: mp4, ogx, oga, ogv, ogg, webm.",

            // Messages for "community_name"
            "community_name.required" => "The community name is required.",
            "community_name.string" => "The community name must be a valid string.",
            "community_name.unique" => "This community does not exist.",
        ];
    }
}
