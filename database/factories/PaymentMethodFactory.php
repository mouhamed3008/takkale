<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentMethodFactory extends Factory
{
    protected $model = PaymentMethod::class;

    public function definition(): array
    {
        $methods = ['Espèces', 'Carte bancaire', 'Virement', 'Chèque', 'Mobile Money'];

        return [
            'name' => $this->faker->randomElement($methods),
            'active' => true,
            'user_id' => User::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
