<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\helpers\FactoriesHelper;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Community>
 */
class CommunityFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->unique()->word(),
            "desc" => "blahblahblahblah",
            "icon_url" => FactoriesHelper::fetchFakeContentUrl("images/communities/icons/fake"),
            "banner_url" => FactoriesHelper::fetchFakeContentUrl("images/communities/banners/fake"),
        ];
    }
}
