<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//Models 
use App\Models\Post;

//Traits
use Database\Seeders\Traits\TruncateTrait;

class PostSeeder extends Seeder
{
    use TruncateTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(Post::class);
        Post::factory(200)->create();
    }
}
