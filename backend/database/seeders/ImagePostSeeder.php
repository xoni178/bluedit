<?php

namespace Database\Seeders;

use App\Models\ImagePost;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//Traits
use Database\Seeders\Traits\TruncateTrait;

class ImagePostSeeder extends Seeder
{
    use TruncateTrait;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(\App\Models\ImagePost::class);
        \App\Models\ImagePost::factory(25)->create();
    }
}
