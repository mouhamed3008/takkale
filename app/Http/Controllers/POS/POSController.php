<?php

namespace App\Http\Controllers\POS;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use App\Repositories\CustomerRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentMethodRepository;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class POSController extends Controller
{
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

    public function index(Request $request): Response
    {
        $search = $request->get('name', '');
        $page = $request->get('page', 1);

        $query = $this->productRepository->allQuery()
            ->where(['company_id' => current_user()->company_id]);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%');
            });
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(10, ['*'], 'page', $page);
        $customers = $this->customerRpository->allQuery()->where(['company_id' => current_user()->company_id])->get();
        $paymentMethods = $this->paymentMethodRpository->allQuery()->where(['company_id' => current_user()->company_id])->get();


        return Inertia::render('pos/index', [
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => route('dashboard')],
                ['label' => 'POS', 'url' => route('pos.index')],
            ],
            'products' => $products,
            'customers' => $customers,
            'cart' => $this->normalizeCartItems(session()->get('cart', [])),
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * @param  array<int|string, array<string, mixed>>  $cartItems
     * @return array<int, array<string, mixed>>
     */
    private function normalizeCartItems(array $cartItems): array
    {
        return array_values($cartItems);
    }



    public function orders(Request $request)
    {
        $companyId = current_user()->company_id;
        $query = $this->orderRepository->allQuery()->where('company_id', $companyId);

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->boolean('payment_status'));
        }

        if ($request->filled('payment_method_id')) {
            $query->where('payment_method_id', $request->payment_method_id);
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [
                $request->start_date,
                $request->end_date . ' 23:59:59'
            ]);
        }

        $stats = [
            'total_orders' => $query->count(),
            'total_revenue' => $query->sum('amount'),
            'paid_orders' => $query->where('payment_status', true)->count(),
            'unique_customers' => $query->whereNotNull('customer_id')->distinct('customer_id')->count(),
        ];

        $orders = $query->with(['customer', 'payment_method'])->latest()->paginate(10);

        $paymentMethods = PaymentMethod::all(['id', 'name']);

        return Inertia::render('pos/order-history', [
            'orders' => $orders,
            'stats' => $stats,
            'filters' => $request->only(['payment_status', 'payment_method_id', 'start_date', 'end_date']),
            'paymentMethods' => $paymentMethods,
        ]);
    }


    public function showOrder($id)
    {
        $order = $this->orderRepository->findFirst('id', $id)->load(['customer', 'payment_method', 'products']);

        // dd($order->products);
        return Inertia::render('pos/order-view', [
            'order' => $order
        ]);
    }
}
