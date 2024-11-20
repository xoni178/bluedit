<?php

namespace Database\Factories\helpers;

class FactoriesHelper
{
    /**
     * Pick a random primary key 
     * 
     * @return string
     */
    public static function RandomPrimaryKey(string $model, int $limit, string $primaryKey): string
    {
        if ($model === null || $limit === null || $primaryKey === null) return null;

        $keys  = $model::limit($limit)->pluck($primaryKey)->all();

        $randomIndex = rand(0, $limit - 1);

        return $keys[$randomIndex];
    }
}
