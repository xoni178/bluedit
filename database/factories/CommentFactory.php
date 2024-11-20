<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

//classes 
use Database\Factories\helpers\FactoriesHelper;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "username" => FactoriesHelper::RandomPrimaryKey(\App\Models\User::class, 10, "username"),
            "post_id" => FactoriesHelper::RandomPrimaryKey(\App\Models\Post::class, 6, "id"),
            "body" => fake()->sentence()
        ];
    }
}
