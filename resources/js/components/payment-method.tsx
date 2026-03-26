import { PaymentMethods } from '@/types';
import { useState } from 'react';
import { Card } from './ui/card';

interface PaymentMethodProps {
    onSelect?: (id: number) => void;
    paymentMethods: PaymentMethods[];
}
export default function PaymentMethod({ onSelect, paymentMethods }: PaymentMethodProps) {
    const [selectedId, setSelectedId] = useState(0);
    console.log(paymentMethods);

    const handleSelect = (id: number) => {
        setSelectedId(id);
        if (onSelect) {
            onSelect(id);
        }
    };

    return (
        <Card className="mt-2 w-full rounded-xl p-6">
            <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => handleSelect(p.id)}
                        className={`flex h-10 items-center justify-center gap-2 rounded-xl border ${selectedId === p.id ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'} text-gray-700 transition hover:bg-blue-50`}
                    >
                        <img src="/icons/card.svg" alt={p.name} className="h-5 w-5" />
                        <span className="text-sm font-medium">{p.name}</span>
                    </button>
                ))}
            </div>
        </Card>
    );
}
