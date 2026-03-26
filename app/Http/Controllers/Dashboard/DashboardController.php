<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\CustomerRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentMethodRepository;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    protected $productRepository;
    protected $customerRpository;
    protected $paymentMethodRpository;
    protected $orderRepository;


    public function __construct(
        ProductRepository $productRepository,
        CustomerRepository $customerRpository,
        PaymentMethodRepository $paymentMethodRpository,
        OrderRepository $orderRepository
    ) {
        $this->productRepository = $productRepository;
        $this->customerRpository = $customerRpository;
        $this->paymentMethodRpository = $paymentMethodRpository;
        $this->orderRepository = $orderRepository;
    }


    public function index() {}
}
