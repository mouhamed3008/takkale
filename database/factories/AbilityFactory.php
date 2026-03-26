<?php

namespace Database\Factories;

use App\Models\Ability;
use Illuminate\Database\Eloquent\Factories\Factory;

class AbilityFactory extends Factory
{
    protected $model = Ability::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word(),
            'label' => $this->faker->words(2, true),
            'key' => $this->faker->optional()->word(),
        ];
    }
}
