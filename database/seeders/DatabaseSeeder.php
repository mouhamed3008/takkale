<?php

namespace Database\Seeders;

use App\Models\Ability;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AbilitySeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            AssignAllPermissionsToUsersSeeder::class,
            CompanySeeder::class,
            ProductSeeder::class,
            CustomerSeeder::class,
        ]);
    }
}
