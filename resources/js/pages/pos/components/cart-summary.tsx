import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

interface CartSummaryProps {
    itemCount: number;
    subtotal: number;
    tax: number;
    total: number;
}

export default function CartSummary({ itemCount, subtotal, tax, total }: CartSummaryProps) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="space-y-3 text-base">
                <div className="flex items-center justify-between text-slate-600">
                    <span>Subtotal ({itemCount})</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                    <span>Service Tax</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(tax)}</span>
                </div>

                <Separator className="my-2 bg-slate-200" />

                <div className="flex items-center justify-between text-lg font-semibold text-slate-950">
                    <span>Total payment</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    );
}
