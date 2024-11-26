<?php

namespace Database\Seeders;

use App\Models\Community;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{


    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(CommunitySeeder::class);
        $this->call(CommunityUserSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(PostVotesSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(CommentVotesSeeder::class);
    }
}
