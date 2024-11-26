<?php

namespace Database\Seeders;

//classes
use Illuminate\Database\Seeder;

//Models 
use App\Models\User;

//Traits
use Database\Seeders\Traits\TruncateTrait;


class UserSeeder extends Seeder
{
    use TruncateTrait;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->TruncateTable(User::class);
        User::factory(200)->create();
    }
}
