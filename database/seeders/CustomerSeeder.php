<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $company = Company::first();
        $user = User::first();

        Customer::create([
            'fullname'  => 'John Doe',
            'phone'     => '780000000',
            'address'   => 'Dakar Plateau',
            'email'     => 'john.doe@example.com',
            'company_id' => $company->id,
            'user_id'    => $user->id,
        ]);

        Customer::create([
            'fullname'  => 'Jane Smith',
            'phone'     => '781111111',
            'address'   => 'Yoff, Dakar',
            'email'     => 'jane.smith@example.com',
            'company_id' => $company->id,
            'user_id'    => $user->id,

        ]);
    }
}
