<?php

namespace Database\Factories\helpers;

use Illuminate\Database\Eloquent\Model;

class FactoriesHelper
{
    private static $allValues = [];

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

    /**
     * Generate fake primray keys that when 
     * together they're unique, we can then 
     * use as dummy data for: ex. to register 
     * an upvote or community subscription.
     * 
     * @param mixed 
     * @param string
     * @return array
     */
    public static function getUniquePKValues(string $model1, $primaryKey1, string $model2, $primaryKey2): array
    {

        $current = static::generateNewValues($model1, $primaryKey1, $model2, $primaryKey2);

        $str = implode("", $current);

        //dump(self::$allValues);

        if (count(self::$allValues) === 0) {
            array_push(self::$allValues, $str);

            return $current;
        } else {

            restart:
            foreach (self::$allValues as $subscription) {
                if ($subscription === $str) {
                    $current = static::generateNewValues($model1, $primaryKey1, $model2, $primaryKey2);
                    $str = implode("", $current);

                    goto restart;
                }
            }

            array_push(static::$allValues, $str);

            return $current;
        }

        return [];
    }

    private static function generateNewValues(string $model1, $primaryKey1,  string $model2, $primaryKey2): array
    {

        return  [
            (string)$primaryKey1 => static::RandomPrimaryKey($model1,  (string)$primaryKey1),
            (string)$primaryKey2 => static::RandomPrimaryKey($model2, (string)$primaryKey2),
        ];
    }

    // public static function getRandomVideo(): string{



    //     return 
    // }
}
