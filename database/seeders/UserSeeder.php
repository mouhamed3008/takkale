<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run()
    {
        collect($this->usersList())->each(function ($user) {
            $role         = $user['role'];

            $user_payload = collect($user)->except('role')->all();

            $created_user = User::updateOrCreate(['email' => $user_payload['email']], $user_payload);


            if ($role = Role::firstWhere('name', $role)) {
                $created_user->assignRole($role);
            }
        });
    }
    public function usersList()
    {
        //
        return [
            [
                'name'    => 'Admin User',
                'email'       => 'admin@example.com',
                'phone'       => '770000000',
                'password'    => Hash::make('password'),
                'role'        => 'ADMIN',
                'confirmed'   => true,
            ],
            [
                'name'    => 'Client User',
                'email'       => 'client@example.com',
                'phone'       => '771111111',
                'password'    => Hash::make('password'),
                'role'        => 'GERANT',
                'confirmed'   => false,
            ]
        ];
    }
}
