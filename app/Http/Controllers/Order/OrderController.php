<?php

namespace App\Http\Controllers\Order;

use App\Constants\OrderStatus;
use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Bank;
use App\Models\PaymentMethod;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    //

    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index(Request $request)
    {
        $search = $request->get('code', '');

        $query = $this->orderRepository->allQuery()
            ->with(['customer', 'payment_method'])
            ->where(['company_id' => current_user()->company_id]);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', '%' . $search . '%')
                    ->orWhereHas('customer', function ($customerQuery) use ($search) {
                        $customerQuery->where('fullname', 'like', '%' . $search . '%');
                    })
                    ->orWhere('status', 'like', '%' . $search . '%');
            });
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10);

        return inertia('orders/index', compact('orders'));
    }




    public function store(OrderRequest $request, CartController $cart)
    {
        $validated = $request->validated();

        return DB::transaction(
            function () use ($validated, $cart) {
                $amount = $cart->getTotal();
                $order = $this->orderRepository->create(array_merge(
                    $validated,
                    [
                        'amount' => $amount,
                        'payment_status' => $amount > $validated['amount_received'] ? false : true,
                        'status' => OrderStatus::NEW
                    ]
                ));

                foreach ($cart->getCart() as $item) {
                    $order->products()->attach($item['id'], [
                        'quantity' => $item['qty'],
                        'unit_price' => $item['price'],
                    ]);
                }
                $paymentMethod = PaymentMethod::where('id', $validated['payment_method_id'])->first();
                Bank::create([
                    'order_id' => $order->id,
                    'amount' => $amount,
                    'method' => $paymentMethod->name,
                    'payment_method_id' => $paymentMethod->id
                ]);

                $cart->clear();
                return back();
            }
        );
    }

    public function show($id)
    {
        $order = $this->orderRepository->findFirst('id', $id);

        // Ensure the order belongs to the current user's company
        if ($order->company_id !== current_user()->company_id) {
            abort(403, 'Unauthorized');
        }

        $order->load(['customer', 'payment_method', 'products']);

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }


    public function changeStatus($id)
    {
        $order = $this->orderRepository->findFirst('id', $id);

        // Ensure the order belongs to the current user's company
        if ($order->company_id !== current_user()->company_id) {
            abort(403, 'Unauthorized');
        }

        $this->orderRepository->update(['status' => OrderStatus::TERMINATED], $id);

        $this->show($id);
    }
}
