<?php

use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\POS\POSController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('products', ProductController::class);
    Route::resource('users', \App\Http\Controllers\User\UserController::class);
    Route::resource('orders', OrderController::class);
    Route::patch('orders/{id}/change-status', [OrderController::class, 'changeStatus'])->name('orders.change-status');



    Route::get('/pos', [POSController::class, 'index'])->name('pos.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
    Route::post('/cart/update-price', [CartController::class, 'updatePrice'])->name('cart.update-price');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
