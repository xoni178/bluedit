<?php

namespace Database\Factories\helpers;

class FactoriesHelper
{
    /**
     * Pick a random primary key 
     * 
     * @return string
     */
    public static function RandomPrimaryKey(string $model, string $primaryKey): ?string
    {

        if (!class_exists($model)) {
            return null; // Return null if the class doesn't exist or parameters are invalid
        }

        $keys = $model::pluck($primaryKey)->toArray();

        $randomIndex = rand(0,  count($keys) - 1);

        return $keys[$randomIndex];
    }
}
