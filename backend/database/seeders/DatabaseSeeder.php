<?php

namespace Database\Seeders;

use App\Models\Community;
use App\Models\VideoPost;
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
        $this->call(VideoPostSeeder::class);
        $this->call(ImagePostSeeder::class);
        $this->call(TextPostSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(PostVotesSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(CommentVotesSeeder::class);
    }
}
