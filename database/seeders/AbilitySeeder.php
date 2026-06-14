<?php

namespace Database\Seeders;

use App\Models\Ability;
use App\Models\Category;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class AbilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $abilities_list = array_merge(
            Ability::LIST,
            Product::ABILITIES_LIST,
            Category::ABILITIES_LIST,
            Role::ABILITIES_LIST,
            User::ABILITIES_LIST,
            Company::ABILITIES_LIST,
            User::ABILITIES_LIST,
            Customer::ABILITIES_LIST,

        );

        collect($abilities_list)->values()->collapse()->each(function ($ability) {
            Ability::updateOrCreate([
                'name' => $ability['name'],
            ], [
                'name' => $ability['name'],
                'label' => $ability['label'],
                'key' => $ability['key'] ?? null,
            ]);
        });

        Cache::flush();
    }
}
