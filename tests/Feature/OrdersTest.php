<?php

use App\Models\User;

test('guests cannot access orders index', function () {
    $this->get('/orders')->assertRedirect('/login');
});

test('authenticated users can view orders index', function () {
    $user = User::factory()->create(['phone' => '1234567890']);

    $this->actingAs($user)
        ->get('/orders')
        ->assertOk();
});

test('authenticated users can view order details', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $company = \App\Models\Company::factory()->create(['user_id' => $user->id]);
    $user->company_id = $company->id;
    $user->save();

    $order = \App\Models\Order::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id
    ]);

    $this->actingAs($user)
        ->get("/orders/{$order->id}")
        ->assertOk();
});

test('search orders by code', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $company = \App\Models\Company::factory()->create(['user_id' => $user->id]);
    $user->company_id = $company->id;
    $user->save();

    $order = \App\Models\Order::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'code' => 'ORD-001'
    ]);

    $this->actingAs($user)
        ->get('/orders?code=ORD')
        ->assertOk()
        ->assertSee('ORD-001');
});

test('search orders by customer name', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $company = \App\Models\Company::factory()->create(['user_id' => $user->id]);
    $user->company_id = $company->id;
    $user->save();

    $customer = \App\Models\Customer::factory()->create([
        'company_id' => $company->id,
        'fullname' => 'John Doe'
    ]);

    $order = \App\Models\Order::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'customer_id' => $customer->id
    ]);

    $this->actingAs($user)
        ->get('/orders?code=John')
        ->assertOk()
        ->assertSee('John Doe');
});
