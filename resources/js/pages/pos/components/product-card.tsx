import { cn, formatCurrency } from '@/lib/utils';
import { Product } from '@/types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    highlighted?: boolean;
    onSelect: (productId: number) => void;
}

export default function ProductCard({ product, highlighted = false, onSelect }: ProductCardProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(product.id)}
            className={cn(
                'group flex h-[280px] min-h-[280px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]',
                highlighted && 'border-primary ring-primary/15 ring-2',
            )}
        >
            <div className="relative h-[180px] shrink-0 overflow-hidden bg-slate-100">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="block h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="border-gray absolute top-4 right-4 rounded-full border-2 bg-white/95 p-2 text-slate-900">
                    <Plus className="h-4 w-4" />
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-4">
                <p className="truncate text-lg font-semibold text-slate-950 capitalize">{product.name}</p>

                {/* <div className="flex flex-wrap items-center gap-2 text-sm">
                    {product.previousPrice ? <span className="text-slate-400 line-through">{formatCurrency(0)}</span> : null}
                    {product.discountLabel ? <span className="font-medium text-rose-500">{0}</span> : null}
                </div> */}

                <p className="text-base font-semibold text-slate-700">{formatCurrency(product.price)}</p>
            </div>
        </button>
    );
}
