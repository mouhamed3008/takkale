<?php

namespace App\Http\Controllers\Cart;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;

class CartController extends Controller
{
    //
    protected $productRepository;

    public function __construct(
        ProductRepository $productRepository,
    ) {
        $this->productRepository = $productRepository;
    }
    public function add(Request $request)
    {
        $productId = $request->input('product_id');
        $qty = $request->input('qty', 1);

        $product = $this->productRepository->findOrFail($productId);
        $cart = $this->getCart();
        if (isset($cart[$productId])) {
            $cart[$productId]['qty'] += $qty;
        } else {
            $cart[$productId] = [
                'id'    => $product->id,
                'name'  => $product->name,
                'price' => $product->price,
                'image_url' => $product->image_url,
                'qty'   => $qty,
            ];
        }

        session()->put('cart', $cart);

        $cart = $this->getCart();

        return back();
    }

    public function remove(Request $request)
    {
        $cart = $this->getCart();
        $productId = $request->input('product_id');
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);
        }


        return back()->with('cart', $cart);
    }

    public function clear()
    {
        session()->forget('cart');
        return back()->with('cart', []);
    }



    public function updatePrice(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'price'      => 'required|numeric|min:0',
        ]);

        $cart = $this->getCart();
        $productId = $validated['product_id'];
        $price = $validated['price'];
        if (isset($cart[$productId])) {
            $cart[$productId]['price'] = $price;
            session()->put('cart', $cart);
        } else {
            return back()->withErrors(['product_id' => 'Produit introuvable dans le panier.']);
        }
        $cart = $this->getCart();

        return back();
    }

    public function getTotal(): float
    {
        return collect($this->getCart())
            ->sum(fn($item) => $item['price'] * $item['qty']);
    }

    public function getCart(): array
    {
        return session()->get('cart', []);
    }
}
