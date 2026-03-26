<?php

use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\POS\POSController;
use App\Repositories\CustomerRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentMethodRepository;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    \Mockery::close();
});

it('keeps remaining cart items in session when one item is removed', function () {
    session()->put('cart', [
        1 => [
            'id' => 1,
            'name' => 'First Product',
            'price' => 1000,
            'image_url' => '/storage/products/first.jpg',
            'qty' => 1,
        ],
        2 => [
            'id' => 2,
            'name' => 'Second Product',
            'price' => 2000,
            'image_url' => '/storage/products/second.jpg',
            'qty' => 2,
        ],
    ]);

    $controller = new CartController(\Mockery::mock(ProductRepository::class));
    $request = Request::create('/cart/remove', 'POST', ['product_id' => 1]);

    $controller->remove($request);

    expect(session('cart'))->toHaveCount(1)
        ->and(session('cart'))->toHaveKey(2)
        ->and(session('cart.2.qty'))->toBe(2);
});

it('normalizes cart items for the pos page after sparse removals', function () {
    $controller = new POSController(
        \Mockery::mock(ProductRepository::class),
        \Mockery::mock(CustomerRepository::class),
        \Mockery::mock(PaymentMethodRepository::class),
        \Mockery::mock(OrderRepository::class),
    );

    $reflection = new ReflectionMethod($controller, 'normalizeCartItems');
    $reflection->setAccessible(true);

    $normalizedCart = $reflection->invoke($controller, [
        2 => [
            'id' => 2,
            'name' => 'Second Product',
            'price' => 2000,
            'image_url' => '/storage/products/second.jpg',
            'qty' => 2,
        ],
    ]);

    expect($normalizedCart)->toBeArray()
        ->and($normalizedCart)->toHaveCount(1)
        ->and($normalizedCart[0]['id'])->toBe(2)
        ->and($normalizedCart[0]['qty'])->toBe(2);
});
