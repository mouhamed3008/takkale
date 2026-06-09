<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use App\Repositories\CustomerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    //
    protected $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function index(Request $request)
    {
        $companyId = current_user()->company_id ?? current_user()->company?->id;

        $query = $this->customerRepository->allQuery()
            ->where('company_id', $companyId);

        $search = $request->get('fullname', '');

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder->where('fullname', 'like', '%'.$search.'%')
                    ->orWhere('phone', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%');
            });
        }

        $customers = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('customers/index', [
            'customers' => $customers,
            'filters' => $request->only(['fullname']),
        ]);
    }

    public function store(CustomerRequest $request)
    {
        $this->authorize('create_customer');

        try {
            $this->customerRepository->create($request->validated());

            return redirect()->route('customers.index')
                ->with('success', 'Client créé avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la création du client: '.$e->getMessage()]);
        }
    }

    public function update(CustomerRequest $request, int $customer)
    {
        $this->authorize('update_customer');

        $this->findCustomerForCurrentCompany($customer);

        try {
            $this->customerRepository->update($request->validated(), $customer);

            return redirect()->route('customers.index')
                ->with('success', 'Client mis à jour avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la mise à jour du client: '.$e->getMessage()]);
        }
    }

    public function destroy(int $customer)
    {
        $this->authorize('update_customer');

        $this->findCustomerForCurrentCompany($customer);

        try {
            $this->customerRepository->delete($customer);

            return redirect()->route('customers.index')
                ->with('success', 'Client supprimé avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Une erreur est survenue lors de la suppression du client: '.$e->getMessage()]);
        }
    }

    protected function findCustomerForCurrentCompany(int $customerId): Customer
    {
        $companyId = current_user()->company_id ?? current_user()->company?->id;
        $customer = $this->customerRepository->findOrFail($customerId);

        if ($customer->company_id !== $companyId) {
            abort(403);
        }

        return $customer;
    }
}
