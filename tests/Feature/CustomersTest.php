<?php

use App\Models\Ability;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutMiddleware(ValidateCsrfToken::class);
});

test('guests cannot access customers index', function () {
    $this->get('/customers')->assertRedirect('/login');
});

test('authenticated users can view customers on index', function () {
    $user = User::factory()->create(['phone' => '1234567890', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);

    Customer::factory()->count(2)->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    $this->actingAs($user)
        ->get('/customers')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customers/index')
            ->has('customers.data', 2)
        );
});

test('guests cannot create a customer', function () {
    $this->post('/customers', [
        'fullname' => 'Nouveau Client',
        'phone' => '770000099',
    ])->assertRedirect('/login');
});

test('authenticated users can create a customer', function () {
    $user = User::factory()->create(['phone' => '1234567892', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'create_customer']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->post('/customers', [
            'fullname' => 'Nouveau Client',
            'phone' => '770000099',
            'email' => 'nouveau.client@example.com',
            'address' => 'Dakar Plateau',
        ])
        ->assertRedirect(route('customers.index'))
        ->assertSessionHas('success', 'Client créé avec succès');

    $this->assertDatabaseHas('customers', [
        'fullname' => 'Nouveau Client',
        'phone' => '770000099',
        'email' => 'nouveau.client@example.com',
        'address' => 'Dakar Plateau',
        'company_id' => $company->id,
        'user_id' => $user->id,
    ]);
});

test('customer creation requires fullname and phone', function () {
    $user = User::factory()->create(['phone' => '1234567893', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'create_customer']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->post('/customers', [])
        ->assertSessionHasErrors(['fullname', 'phone']);
});

test('authenticated users can update a customer', function () {
    $user = User::factory()->create(['phone' => '1234567894', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'update_customer']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $customer = Customer::factory()->create([
        'fullname' => 'Client Initial',
        'phone' => '770000020',
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    $this->actingAs($user)
        ->put("/customers/{$customer->id}", [
            'fullname' => 'Client Modifié',
            'phone' => '770000020',
            'email' => 'modifie@example.com',
            'address' => 'Almadies',
        ])
        ->assertRedirect(route('customers.index'))
        ->assertSessionHas('success', 'Client mis à jour avec succès');

    $this->assertDatabaseHas('customers', [
        'id' => $customer->id,
        'fullname' => 'Client Modifié',
        'email' => 'modifie@example.com',
        'address' => 'Almadies',
    ]);
});

test('authenticated users can delete a customer', function () {
    $user = User::factory()->create(['phone' => '1234567895', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'update_customer']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $customer = Customer::factory()->create([
        'phone' => '770000021',
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    $this->actingAs($user)
        ->delete("/customers/{$customer->id}")
        ->assertRedirect(route('customers.index'))
        ->assertSessionHas('success', 'Client supprimé avec succès');

    $this->assertSoftDeleted('customers', ['id' => $customer->id]);
});

test('customers index can be searched by fullname', function () {
    $user = User::factory()->create(['phone' => '1234567891', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);

    Customer::factory()->create([
        'fullname' => 'Alpha Client',
        'phone' => '770000010',
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    Customer::factory()->create([
        'fullname' => 'Beta Client',
        'phone' => '770000011',
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    $this->actingAs($user)
        ->get('/customers?fullname=Alpha')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customers/index')
            ->has('customers.data', 1)
            ->where('customers.data.0.fullname', 'Alpha Client')
        );
});
