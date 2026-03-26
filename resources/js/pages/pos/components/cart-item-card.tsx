import { Minus, PencilLine, Plus, Trash2 } from 'lucide-react';

import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';
import { useState } from 'react';
import type { CartItem } from './cart-types';
import UpdatePrice from './update-price';

interface CartItemCardProps {
    item: CartItem;
    onIncreaseQuantity: (productId: number, delta: number) => void;
    onDecreaseQuantity: (productId: number, delta: number) => void;
    onRemoveItem: (productId: number) => void;
}

export default function CartItemCard({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }: CartItemCardProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-2">
            <div className="flex items-center gap-4">
                <img src={item.image_url} alt={item.name} className="border-gray h-[62px] w-[62px] rounded-xl border-2 object-cover" />

                <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="truncate text-lg font-semibold text-slate-950 capitalize">{item.name}</p>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                                    <span className="font-bold text-black">{formatCurrency(item.price)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onDecreaseQuantity(item.id, -1)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
                        >
                            <Minus className="h-4 w-4" />
                        </button>

                        <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-50 px-3 text-base font-semibold text-slate-900">
                            {item.qty}
                        </div>

                        <button
                            type="button"
                            onClick={() => onIncreaseQuantity(item.id, 1)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex">
                        <button type="button" onClick={() => onRemoveItem(item.id)} className="rounded-full bg-rose-50 p-2 text-rose-500 transition">
                            <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() =>
                                setSelectedProduct({
                                    id: item.id,
                                    name: item.name,
                                    description: '',
                                    price: item.price,
                                    created_at: '',
                                    updated_at: '',
                                    image: item.image_url,
                                    image_url: item.image_url,
                                    user: {} as any,
                                    active: true,
                                })
                            }
                            className="ml-1 flex items-center justify-center rounded-full bg-blue-50 p-2 text-blue-500 transition"
                            title="Modifier le prix"
                        >
                            <PencilLine className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
            {selectedProduct && <UpdatePrice open={!!selectedProduct} setModalOpenPrice={() => setSelectedProduct(null)} product={selectedProduct} />}
        </div>
    );
}
