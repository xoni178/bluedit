<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Database\Factories\helpers\FactoriesHelper;

//models
use App\Models\User;
use App\Models\Comment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommentVotes>
 */
class CommentVotesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $array = FactoriesHelper::getUniquePKValues(User::class, "username", Comment::class, "id");

        return [
            "username" => $array["username"],
            "comment_id" => $array["id"],
            'vote_type' => rand(0, 1) ? 'UPVOTE' : 'DOWNVOTE',
        ];
    }
}
