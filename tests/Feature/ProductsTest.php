<?php

use App\Models\Ability;
use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;

test('a product belongs to a category', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'user_id' => $category->user_id,
        'company_id' => $category->company_id,
    ]);

    expect($product->category)->toBeInstanceOf(Category::class);
    expect($product->category->id)->toBe($category->id);
    expect($category->fresh()->products)->toHaveCount(1);
    expect($category->fresh()->products->first()->id)->toBe($product->id);
});

test('guests cannot access products index', function () {
    $this->get('/products')->assertRedirect('/login');
});

test('authenticated users can view products index', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $role = Role::factory()->create(['name' => 'ADMIN']);
    $ability = Ability::factory()->create(['name' => 'list_product']);
    $role->abilities()->attach($ability);
    $user->assignRole($role->id);

    $this->actingAs($user)
        ->get('/products')
        ->assertOk();
});
