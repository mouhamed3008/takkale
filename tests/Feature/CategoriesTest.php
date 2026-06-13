<?php

use App\Models\Ability;
use App\Models\Category;
use App\Models\Company;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;

beforeEach(function () {
    $this->withoutMiddleware(ValidateCsrfToken::class);
});

test('guests cannot access categories index', function () {
    $this->get('/categories')->assertRedirect('/login');
});

test('authenticated users can view categories index', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'list_category']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->get('/categories')
        ->assertOk()
        ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('categories/index')
            ->has('categories.data')
        );
});

test('guests cannot create a category', function () {
    $this->post('/categories', [
        'name' => 'Électronique',
    ])->assertRedirect('/login');
});

test('authenticated users can create a category', function () {
    $user = User::factory()->create(['phone' => '1234567892', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'create_category']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->post('/categories', [
            'name' => 'Électronique',
            'is_shop' => true,
        ])
        ->assertRedirect(route('categories.index'))
        ->assertSessionHas('success', 'Catégorie créée avec succès');

    $this->assertDatabaseHas('categories', [
        'name' => 'Électronique',
        'is_shop' => true,
        'company_id' => $company->id,
        'user_id' => $user->id,
    ]);
});

test('category creation requires name', function () {
    $user = User::factory()->create(['phone' => '1234567893', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'create_category']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->post('/categories', [])
        ->assertSessionHasErrors(['name']);
});

test('authenticated users can update a category', function () {
    $user = User::factory()->create(['phone' => '1234567894', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $category = Category::factory()->create([
        'name' => 'Ancienne catégorie',
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'update_category']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->put("/categories/{$category->id}", [
            'name' => 'Nouvelle catégorie',
            'is_shop' => false,
        ])
        ->assertRedirect(route('categories.index'))
        ->assertSessionHas('success', 'Catégorie mise à jour avec succès');

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Nouvelle catégorie',
        'is_shop' => false,
    ]);
});

test('authenticated users can delete a category', function () {
    $user = User::factory()->create(['phone' => '1234567895', 'company_id' => null]);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $category = Category::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'create_category']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->delete("/categories/{$category->id}")
        ->assertRedirect(route('categories.index'))
        ->assertSessionHas('success', 'Catégorie supprimée avec succès');

    $this->assertSoftDeleted('categories', [
        'id' => $category->id,
    ]);
});
