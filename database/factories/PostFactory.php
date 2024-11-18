<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

//Models
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        return [
            "username" => $this->randomUsername(),
            "community_name" => "HarryPotterGame",
            "title" => "hi I need help with something"
        ];
    }

    private function randomUsername(): string
    {

        $usernames  = User::limit(10)->pluck("username")->all();

        $randomIndex = rand(0, 9);

        return $usernames[$randomIndex];
    }
}
