<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//models
use App\Models\PostVotes;


use Database\Seeders\traits\TruncateTrait;

class PostVotesSeeder extends Seeder
{
    use TruncateTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $this->TruncateTable(PostVotes::class);
        PostVotes::factory(6)->create();
    }
}
