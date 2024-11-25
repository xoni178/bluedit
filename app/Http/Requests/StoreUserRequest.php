<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'username' => 'required|regex:/^[a-zA-Z0-9_-]+$/|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*?&]/|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => 'Please provide a username.',
            'username.regex' => 'Username can only include letters, numbers, underscores, and dashes.',
            'username.unique' => 'This username is already taken.',
            'email.required' => 'We need your email address.',
            'email.email' => 'Your email address must be valid.',
            'email.unique' => 'This email is already in use.',
            'password.required' => 'You must create a password.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.regex' => 'Password must include an uppercase letter, a lowercase letter, a number, and a special character.',
            'password.confirmed' => 'Passwords must match.',
        ];
    }
}
