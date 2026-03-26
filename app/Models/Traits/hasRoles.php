<?php

namespace App\Models\Traits;

use App\Models\Role;
use App\Models\Group;

trait HasRoles
{

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    // public function groups()
    // {
    //     return $this->belongsToMany(Group::class);
    // }

    public function assignRole($role)
    {
        $this->roles()->sync($role);
    }

    public function abilities()
    {
        return $this->roles()->get()->map->abilities->collapse()->pluck('name')->unique();
    }

    public function currentRoleName()
    {
        return $this->roles()->first()->name ?? '';
    }

    public function isAdmin()
    {
        return $this->hasRoles(['ADMIN', 'SUPERADMIN']);
    }

    public function hasRole($role)
    {
        $userRoles = $this->roles()->pluck('name');
        return $userRoles->count() == 1 && $userRoles->contains($role);
    }

    public function hasRoles($roles)
    {
        $userRoles = $this->roles()->pluck('name');

        foreach ($roles as $role) {
            if ($userRoles->contains($role)) return true;
        }

        return false;
    }

    public function assignAllPermissions()
    {
        $roles = $this->roles()->get();

        foreach ($roles as $role) {
            $role->allowAllAbilities();
        }
    }
}
