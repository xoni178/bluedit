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
    private string $postableType;

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
            "title" => fake()->sentence(4),
            "postable_type" => $this->randomElement(),
            "postable_id" => $this->selectAppropriatePrimaryKey(),
        ];
    }

    private function randomElement()
    {
        $element = fake()->randomElement(["text_post", "video_post", "image_post"]);


        $this->postableType = $element;

        return $element;
    }

    private function selectAppropriatePrimaryKey()
    {
        $postableType = $this->postableType;


        switch ($postableType) {
            case "text_post":
                return FactoriesHelper::RandomPrimaryKey(\App\Models\TextPost::class, "id");
            case "video_post":
                return FactoriesHelper::RandomPrimaryKey(\App\Models\VideoPost::class, "id");
            case "image_post":
                return FactoriesHelper::RandomPrimaryKey(\App\Models\ImagePost::class, "id");
            default:
                return FactoriesHelper::RandomPrimaryKey(\App\Models\TextPost::class, "id");
        }
    }
}
