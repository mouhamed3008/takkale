<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Ability;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AssignAllPermissionsToUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting permission assignment...');

        // Get all users
        $users = User::all();
        $this->command->info("Found {$users->count()} users");

        // Get all abilities/permissions
        $abilities = Ability::all();
        $this->command->info("Found {$abilities->count()} abilities");

        if ($users->isEmpty()) {
            $this->command->error('No users found in the database!');
            return;
        }

        if ($abilities->isEmpty()) {
            $this->command->error('No abilities found in the database!');
            return;
        }

        // Work with the existing ADMIN role
        $adminRole = Role::where('name', 'ADMIN')->first();

        if (!$adminRole) {
            $this->command->error('ADMIN role not found!');
            return;
        }

        $this->command->info("Using existing ADMIN role (ID: {$adminRole->id})");

        // Clear existing ability_role relationships for ADMIN role
        DB::table('ability_role')->where('role_id', $adminRole->id)->delete();
        $this->command->info('Cleared existing ability-role relationships for ADMIN role');

        // Assign all abilities to the ADMIN role
        $abilityRoleData = [];
        foreach ($abilities as $ability) {
            $abilityRoleData[] = [
                'ability_id' => $ability->id,
                'role_id' => $adminRole->id,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        // Bulk insert for better performance
        DB::table('ability_role')->insert($abilityRoleData);
        $this->command->info("Assigned {$abilities->count()} abilities to ADMIN role");

        // Clear existing role_user relationships for all users
        DB::table('role_user')->whereIn('user_id', $users->pluck('id'))->delete();
        $this->command->info('Cleared existing user-role relationships');

        // Assign ADMIN role to all users
        $userRoleData = [];
        foreach ($users as $user) {
            $userRoleData[] = [
                'user_id' => $user->id,
                'role_id' => $adminRole->id,
            ];
        }

        // Bulk insert for better performance
        DB::table('role_user')->insert($userRoleData);
        $this->command->info("Assigned ADMIN role to {$users->count()} users");

        // Also update the role_id field in users table if it exists
        try {
            User::query()->update(['role_id' => $adminRole->id]);
            $this->command->info('Updated role_id field in users table');
        } catch (\Exception $e) {
            $this->command->warn('Could not update role_id field in users table (field might not exist)');
        }

        // Verify the assignments
        $abilityRoleCount = DB::table('ability_role')->where('role_id', $adminRole->id)->count();
        $userRoleCount = DB::table('role_user')->where('role_id', $adminRole->id)->count();

        $this->command->info('=== VERIFICATION ===');
        $this->command->info("Abilities assigned to ADMIN role: {$abilityRoleCount}");
        $this->command->info("Users assigned to ADMIN role: {$userRoleCount}");

        // Check if your app uses Spatie Laravel Permission package
        if (class_exists('\Spatie\Permission\Models\Permission')) {
            $this->command->info('Detected Spatie Laravel Permission package');
            $this->assignSpatiePermissions($users);
        }

        $this->command->info('Successfully assigned all permissions to all users!');
    }

    private function assignSpatiePermissions($users)
    {
        try {
            // If using Spatie Laravel Permission, also sync those permissions
            $spatiePermissions = \Spatie\Permission\Models\Permission::all();

            foreach ($users as $user) {
                $user->syncPermissions($spatiePermissions);
            }

            $this->command->info("Synced {$spatiePermissions->count()} Spatie permissions to {$users->count()} users");
        } catch (\Exception $e) {
            $this->command->warn('Failed to sync Spatie permissions: ' . $e->getMessage());
        }
    }
}
