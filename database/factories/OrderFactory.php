<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Customer;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'code' => 'ORD-' . $this->faker->unique()->numberBetween(1000, 9999),
            'status' => 'new',
            'payment_status' => $this->faker->boolean(),
            'amount' => $this->faker->numberBetween(10000, 100000),
            'amount_received' => $this->faker->numberBetween(5000, 50000),
            'delivery_at' => $this->faker->dateTimeBetween('now', '+30 days'),
            'user_id' => User::factory(),
            'customer_id' => Customer::factory(),
            'payment_method_id' => PaymentMethod::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
