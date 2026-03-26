<?php

use App\Models\User;

test('guests cannot access products index', function () {
    $this->get('/products')->assertRedirect('/login');
});

test('authenticated users can view products index', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $role = \App\Models\Role::factory()->create(['name' => 'ADMIN']);
    $ability = \App\Models\Ability::factory()->create(['name' => 'list_product']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->get('/products')
        ->assertOk();
});
