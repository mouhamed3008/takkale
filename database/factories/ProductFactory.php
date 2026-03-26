<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'price' => $this->faker->randomFloat(2, 5, 100),
            'description' => $this->faker->sentence(),
            'image' => null,
            'user_id' => User::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
