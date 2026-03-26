<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $user = User::first();
        $company = Company::first();


        Product::create([
            'name'        => 'Laptop Dell XPS',
            'price'       => 1500,
            'description' => 'High-performance laptop for professionals',
            'image'       => 'laptop.png',
            'user_id'     => $user->id,
            'company_id'  => $company->id,
        ]);

        Product::create([
            'name'        => 'iPhone 15',
            'price'       => 1200,
            'description' => 'Latest Apple smartphone',
            'image'       => 'iphone.png',
            'user_id'     => $user->id,
            'company_id'  => $company->id,
        ]);
    }
}
