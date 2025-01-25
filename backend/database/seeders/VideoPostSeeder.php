<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//Traits
use Database\Seeders\Traits\TruncateTrait;

class VideoPostSeeder extends Seeder
{
    use TruncateTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(\App\Models\VideoPost::class);
        \App\Models\VideoPost::factory(25)->create();
    }
}
