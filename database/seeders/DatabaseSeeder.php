<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{


    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(CommentSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CommunitySeeder::class);
        $this->call(PostSeeder::class);
    }
}
