<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//Traits
use Database\Seeders\Traits\TruncateTrait;

class TextPostSeeder extends Seeder
{
    use TruncateTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(\App\Models\TextPost::class);
        \App\Models\TextPost::factory(150)->create();
    }
}
