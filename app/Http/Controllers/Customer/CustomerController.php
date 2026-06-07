<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Repositories\CustomerRepository;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //
    protected $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function index()
    {
        $customers = $this->customerRepository->allQuery()->where(['company_id' => current_user()->company_id])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia('customers/index', compact('customers'));
    }




    public function store(CustomerRequest $request)
    {
        $this->authorize('create_product');

        try {
            $product = $this->customerRepository->create($request->all());

            return redirect()->route('customers.index')
                ->with('success', 'Client créé avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la création du client: ' . $e->getMessage()]);
        }
    }
}
