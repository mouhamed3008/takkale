<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $admin = User::first();

        Company::create([
            'name'     => 'Tech Solutions',
            'address'  => '123 Dakar, Senegal',
            'user_id'  => $admin->id,
            'logo'     => 'company_logo.png',
        ]);
    }
}
