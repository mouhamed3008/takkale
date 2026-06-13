<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Company;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

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

        $electronics = Category::create([
            'name' => 'Électronique',
            'user_id' => $user->id,
            'company_id' => $company->id,
        ]);

        $phones = Category::create([
            'name' => 'Téléphones',
            'user_id' => $user->id,
            'company_id' => $company->id,
        ]);

        Product::create([
            'name' => 'Laptop Dell XPS',
            'price' => 1500,
            'description' => 'High-performance laptop for professionals',
            'image' => 'laptop.png',
            'user_id' => $user->id,
            'company_id' => $company->id,
            'category_id' => $electronics->id,
        ]);

        Product::create([
            'name' => 'iPhone 15',
            'price' => 1200,
            'description' => 'Latest Apple smartphone',
            'image' => 'iphone.png',
            'user_id' => $user->id,
            'company_id' => $company->id,
            'category_id' => $phones->id,
        ]);
    }
}
