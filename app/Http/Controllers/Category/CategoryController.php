<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Repositories\CategoryRepository;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected $categoryRepository;

    public function __construct(
        CategoryRepository $categoryRepository,
    ) {
        $this->categoryRepository = $categoryRepository;
    }

    public function index()
    {
        $this->authorize('list_category');

        $categories = $this->categoryRepository->allQuery()
            ->where(['company_id' => current_user()->company_id])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        $this->authorize('create_category');

        return Inertia::render('categories/create', []);
    }

    public function store(CategoryRequest $request)
    {
        $this->authorize('create_category');

        try {
            $this->categoryRepository->create($request->all());

            return redirect()->route('categories.index')
                ->with('success', 'Catégorie créée avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la création de la catégorie: '.$e->getMessage()]);
        }
    }

    public function show($id)
    {
        $this->authorize('read_category');
        $category = $this->categoryRepository->find($id);

        return Inertia::render('categories/show', [
            'category' => $category,
        ]);
    }

    public function edit($id)
    {
        $this->authorize('update_category');
        $category = $this->categoryRepository->find($id);

        return Inertia::render('categories/edit', [
            'category' => $category,
        ]);
    }

    public function update(CategoryRequest $request, $id)
    {
        $this->authorize('update_category');

        try {
            $this->categoryRepository->update($request->all(), $id);

            return redirect()->route('categories.index')
                ->with('success', 'Catégorie mise à jour avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la mise à jour de la catégorie: '.$e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $this->authorize('create_category');

        try {
            $this->categoryRepository->delete($id);

            return redirect()->route('categories.index')
                ->with('success', 'Catégorie supprimée avec succès');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Une erreur est survenue lors de la suppression de la catégorie: '.$e->getMessage()]);
        }
    }
}
