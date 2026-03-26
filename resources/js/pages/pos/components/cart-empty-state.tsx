import { ShoppingBasket } from 'lucide-react';

export default function CartEmptyState() {
    return (
        <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
                <ShoppingBasket className="h-6 w-6" />
            </div>
            <p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate-500">Select products from the grid to start this order.</p>
        </div>
    );
}
