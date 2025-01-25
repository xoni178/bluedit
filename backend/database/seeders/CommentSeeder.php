<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
//Models 
use App\Models\Comment;

//Traits
use Database\Seeders\Traits\TruncateTrait;

class CommentSeeder extends Seeder
{
    use TruncateTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(Comment::class);
        Comment::factory(10)->create();
    }
}
