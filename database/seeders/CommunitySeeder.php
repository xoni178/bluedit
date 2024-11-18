<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
//Models 
use App\Models\Community;

//Traits
use Database\Seeders\Traits\TruncateTrait;

class CommunitySeeder extends Seeder
{
    use TruncateTrait;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(Community::class);
        Community::factory(3)->create();
    }
}
