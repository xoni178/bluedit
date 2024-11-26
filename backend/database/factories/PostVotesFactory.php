<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Database\Factories\helpers\FactoriesHelper;

//models
use App\Models\User;
use App\Models\Post;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PostVotes>
 */
class PostVotesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $array = FactoriesHelper::getUniquePKValues(User::class, "username", Post::class, "id");

        return [
            "username" => $array["username"],
            "post_id" => $array["id"],
            'vote_type' => rand(0, 1) ? 'UPVOTE' : 'DOWNVOTE',
        ];
    }
}
