<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ImagePost>
 */
class ImagePostFactory extends Factory
{
    private function fetchRandomImage()
    {
        $files = Storage::disk('public')->files("images/fake");

        if (count($files) === 0) return "";


        $lastIndex = count($files) - 1;

        $randomIndex = rand(0, $lastIndex);

        return Storage::url($files[$randomIndex]);
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "image_url" => $this->fetchRandomImage()
        ];
    }
}
