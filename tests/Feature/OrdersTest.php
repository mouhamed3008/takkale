<?php

use App\Models\Bank;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Product;
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

test('recovering all articles marks order as finished', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $order = Order::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'status' => 'new',
        'payment_status' => true,
        'amount' => 5000,
        'amount_received' => 5000,
    ]);

    $products = Product::factory()->count(2)->create(['user_id' => $user->id]);
    $order->products()->attach($products[0]->id, ['quantity' => 1, 'unit_price' => 2500]);
    $order->products()->attach($products[1]->id, ['quantity' => 1, 'unit_price' => 2500]);

    $this->actingAs($user)
        ->post("/orders/{$order->id}/recover", ['product_ids' => []])
        ->assertRedirect();

    expect($order->fresh()->status)->toBe('finished');
    expect($order->fresh()->products()->wherePivot('is_recovered', false)->exists())->toBeFalse();
});

test('recovering specific articles does not finish the order', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $order = Order::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'status' => 'new',
        'payment_status' => true,
        'amount' => 5000,
        'amount_received' => 5000,
    ]);

    $products = Product::factory()->count(2)->create(['user_id' => $user->id]);
    $order->products()->attach($products[0]->id, ['quantity' => 1, 'unit_price' => 2500]);
    $order->products()->attach($products[1]->id, ['quantity' => 1, 'unit_price' => 2500]);

    $this->actingAs($user)
        ->post("/orders/{$order->id}/recover", ['product_ids' => [$products[0]->id]])
        ->assertRedirect();

    expect($order->fresh()->status)->toBe('new');
    expect($order->fresh()->products()->wherePivot('is_recovered', true)->count())->toBe(1);
    expect($order->fresh()->products()->wherePivot('is_recovered', false)->count())->toBe(1);
});

test('recovery with encaissement creates bank entry and updates amount received', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $paymentMethod = PaymentMethod::factory()->create();

    $order = Order::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'status' => 'new',
        'payment_status' => false,
        'amount' => 5000,
        'amount_received' => 2000,
    ]);

    $product = Product::factory()->create(['user_id' => $user->id]);
    $order->products()->attach($product->id, ['quantity' => 1, 'unit_price' => 5000]);

    $this->actingAs($user)
        ->post("/orders/{$order->id}/recover", [
            'product_ids' => [],
            'amount_paid' => 3000,
            'payment_method_id' => $paymentMethod->id,
        ])
        ->assertRedirect();

    expect(Bank::where('order_id', $order->id)->where('amount', 3000)->exists())->toBeTrue();
    expect($order->fresh()->amount_received)->toBe('5000');
    expect((bool) $order->fresh()->payment_status)->toBeTrue();
    expect($order->fresh()->status)->toBe('finished');
});

test('user from another company cannot recover an order', function () {
    $user = User::factory()->create(['phone' => '1234567890']);
    $company = Company::factory()->create(['user_id' => $user->id]);
    $user->update(['company_id' => $company->id]);

    $otherUser = User::factory()->create(['phone' => '0987654321']);
    $otherCompany = Company::factory()->create(['user_id' => $otherUser->id]);
    $otherUser->update(['company_id' => $otherCompany->id]);

    $order = Order::factory()->create([
        'user_id' => $user->id,
        'company_id' => $company->id,
    ]);

    $this->actingAs($otherUser)
        ->post("/orders/{$order->id}/recover", [])
        ->assertForbidden();
});
