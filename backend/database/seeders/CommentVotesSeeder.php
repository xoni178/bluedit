<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//models
use App\Models\CommentVotes;

use Database\Seeders\traits\TruncateTrait;

class CommentVotesSeeder extends Seeder
{
    use TruncateTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(CommentVotes::class);
        CommentVotes::factory(6)->create();
    }
}
