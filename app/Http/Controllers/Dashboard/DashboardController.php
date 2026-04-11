<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Repositories\OrderRepository;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $companyId = current_user()->company_id;
        $today = Carbon::today();

        $cashBalance = Bank::where('company_id', $companyId)->sum('amount');
        $todayRevenue = Bank::where('company_id', $companyId)
            ->whereDate('created_at', $today)
            ->sum('amount');

        $todayOrdersCount = $this->orderRepository->allQuery()
            ->where('company_id', $companyId)
            ->whereDate('created_at', $today)
            ->count();

        $deliveriesToday = $this->orderRepository->allQuery()
            ->with('customer')
            ->where('company_id', $companyId)
            ->whereDate('delivery_at', $today)
            ->whereNotIn('status', ['finished', 'cancelled'])
            ->orderBy('delivery_at', 'asc')
            ->limit(10)
            ->get();

        return Inertia::render('dashboard', [
            'cashBalance' => $cashBalance,
            'todayRevenue' => $todayRevenue,
            'todayOrdersCount' => $todayOrdersCount,
            'deliveriesDueTodayCount' => $deliveriesToday->count(),
            'deliveriesToday' => $deliveriesToday,
        ]);
    }
}
