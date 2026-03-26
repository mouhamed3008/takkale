import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import cart from '@/routes/cart';
import { PaginatedData, Product } from '@/types';
import { router } from '@inertiajs/react';
import ProductCard from './product-card';

export interface PosCategory {
    id: string;
    name: string;
    count: number;
}

interface ProductGridProps {
    categories: PosCategory[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
    products: PaginatedData<Product>;
}

export default function ProductGrid({ categories, activeCategory, onCategoryChange, products }: ProductGridProps) {
    const addToCart = (productId: number, qty = 1) => {
        router.post(cart.add.url(), { product_id: productId, qty }, { preserveScroll: true, preserveState: true });
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-6">
            {/* <div className="grid gap-3 border-b border-slate-200/80 pb-6 sm:grid-cols-2 xl:grid-cols-6">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => onCategoryChange(category.id)}
                        className={cn(
                            'rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-slate-300',
                            activeCategory === category.id && 'border-[#3b82f6] bg-[#eff6ff] shadow-[0_10px_24px_rgba(59,130,246,0.16)]',
                        )}
                    >
                        <p className={cn('text-lg font-semibold text-slate-950', activeCategory === category.id && 'text-[#2563eb]')}>
                            {category.name}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">{category.count} items</p>
                    </button>
                ))}
            </div> */}

            <div className="mt-6 grid min-h-0 flex-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
                <Button
                    type="button"
                    className="hover:border-primary flex h-[280px] min-h-[280px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white text-center shadow-sm transition hover:bg-[#f8fbff]"
                >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                        <Plus className="h-7 w-7" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">Add New Product</p>
                </Button>

                {products.data.map((product, index) => (
                    <ProductCard key={product.id} product={product} highlighted={index === 0} onSelect={addToCart} />
                ))}
            </div>
        </div>
    );
}
