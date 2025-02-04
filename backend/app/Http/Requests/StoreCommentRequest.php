<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\UserService;
use App\Exceptions\InvalidToken;

class StoreCommentRequest extends FormRequest
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
            "body" => "required|string|min:1|max:65500"
        ];
    }
}
