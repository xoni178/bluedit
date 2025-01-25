<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VideoPost>
 */
class VideoPostFactory extends Factory
{
    private function fetchRandomVideo()
    {
        $files = Storage::disk('public')->files("videos");

        error_log(print_r($files));

        if (count($files) === 0) return "";


        $lastIndex = count($files) - 1;

        $randomIndex = rand(0, $lastIndex);

        return Storage::url($files[$randomIndex]);;
    }
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "video_url" => $this->fetchRandomVideo(),
        ];
    }
}
