<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Repositories\CategoryRepository;
use App\Repositories\ProductRepository;
use Inertia\Inertia;

class ProductController extends Controller
{
    //

    protected $productRepository;

    protected $categoryRepository;

    public function __construct(
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository,
    ) {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function index()
    {
        $this->authorize('list_product');

        $companyId = current_user()->company_id;

        $products = $this->productRepository->allQuery()
            ->where(['company_id' => $companyId])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $categories = $this->categoryRepository->allQuery()
            ->where('company_id', $companyId)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        $this->authorize('create_product');

        return Inertia::render('products/create', []);
    }

    public function store(ProductRequest $request)
    {
        $this->authorize('create_product');

        try {
            $product = $this->productRepository->create($request->all());

            return redirect()->route('products.index')
                ->with('success', 'Produit créé avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la création du produit: '.$e->getMessage()]);
        }
    }

    public function show($id)
    {
        $this->authorize('read_product');
        $product = $this->productRepository->find($id);

        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    public function edit($id)
    {
        $this->authorize('update_product');
        $product = $this->productRepository->find($id);

        return Inertia::render('products/edit', [
            'product' => $product,
        ]);
    }

    public function update(ProductRequest $request, $id)
    {
        $this->authorize('update_product');

        try {
            $product = $this->productRepository->update($id, $request->all());

            return redirect()->route('products.index')
                ->with('success', 'Produit mis à jour avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la mise à jour du produit: '.$e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $this->authorize('create_product');

        try {
            $this->productRepository->delete($id);

            return redirect()->route('products.index')
                ->with('success', 'Produit supprimé avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Une erreur est survenue lors de la suppression du produit: '.$e->getMessage()]);
        }
    }
}
