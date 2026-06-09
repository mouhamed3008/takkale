<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $admin = User::first();

        $company = Company::create([
            'name' => 'Tech Solutions',
            'address' => '123 Dakar, Senegal',
            'user_id' => $admin->id,
            'logo' => 'company_logo.png',
        ]);

        $admin->update(['company_id' => $company->id]);
    }
}
