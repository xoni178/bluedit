<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\helpers\FactoriesHelper;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ImagePost>
 */
class ImagePostFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "image_url" => FactoriesHelper::fetchFakeContentUrl("images/posts/fake"),
        ];
    }
}
