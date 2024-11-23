<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Database\Factories\helpers\FactoriesHelper;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Community_Post>
 */
class CommunityUserFactory extends Factory
{
    private $allSubscription = [];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return $this->values();
    }

    private function values(): array
    {

        $current = $this->generateNewValues();

        $str = implode("", $current);

        dump($this->allSubscription);

        if (count($this->allSubscription) === 0) {
            array_push($this->allSubscription, $str);

            return $current;
        } else {

            restart:
            foreach ($this->allSubscription as $subscription) {
                if ($subscription === $str) {
                    $current = $this->generateNewValues();
                    $str = implode("", $current);

                    goto restart;
                }
            }

            array_push($this->allSubscription, $str);

            return $current;
        }

        return [];
    }

    private function generateNewValues(): array
    {

        return  [
            "username" => FactoriesHelper::RandomPrimaryKey(\App\Models\User::class,  "username"),
            "community_name" => FactoriesHelper::RandomPrimaryKey(\App\Models\Community::class, "name"),
        ];
    }
}
