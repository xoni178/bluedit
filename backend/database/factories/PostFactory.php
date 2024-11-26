<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
//classes 
use Database\Factories\helpers\FactoriesHelper;

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
            "username" => FactoriesHelper::RandomPrimaryKey(\App\Models\User::class,   "username"), //Pick a fake random user as the creator of the fake post
            "community_name" => FactoriesHelper::RandomPrimaryKey(\App\Models\Community::class, "name"), //Pick a random fake community for the fake post
            "title" => fake()->sentence(4)
        ];
    }
}
