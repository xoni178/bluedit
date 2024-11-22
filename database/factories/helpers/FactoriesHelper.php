<?php

namespace Database\Factories\helpers;

class FactoriesHelper
{
    /**
     * Pick a random primary key 
     * 
     * @return string
     */
    public static function RandomPrimaryKey(string $model, int $limit, string $primaryKey): ?string
    {

        if (!class_exists($model) || $limit <= 0) {
            return null; // Return null if the class doesn't exist or parameters are invalid
        }

        $keys = $model::pluck($primaryKey)->take($limit)->toArray();

        $randomIndex = rand(0, $limit - 1);

        return $keys[$randomIndex];
    }
}
