<?php

namespace Database\Seeders;

use App\Models\CommunityUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//Traits
use Database\Seeders\Traits\TruncateTrait;

class CommunityUserSeeder extends Seeder
{
    use TruncateTrait;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(CommunityUser::class);
        CommunityUser::factory(5)->create();
    }
}
