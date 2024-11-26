<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

//Traits
use Database\Seeders\Traits\TruncateTrait;

//models
use App\Models\User;
use App\Models\Community;

use Database\Factories\helpers\FactoriesHelper;

class CommunityUserSeeder extends Seeder
{
    use TruncateTrait;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncatePivotTable("community_user");



        for ($i = 1; $i <= 10; $i++) {

            $array = FactoriesHelper::getUniquePKValues(User::class, "username", Community::class, "name");

            $user = User::findOrFail($array["username"]);
            $user->communities()->attach($array["name"]);
        }
    }
}
