import { useEffect, useState } from 'react';

import PaymentMethod from '@/components/payment-method';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import orders from '@/routes/orders';
import { Customer, PaymentMethods } from '@/types';
import { router } from '@inertiajs/react';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

interface CartDetailsProps {
    itemCount: number;
    subtotal: number;
    tax: number;
    total: number;
    selectedCustomer: Customer | null;
    setModalOpen: (open: boolean) => void;
    modalOpen: boolean;
    paymentMethods: PaymentMethods[];
}

export default function CartDetails({
    itemCount,
    subtotal,
    tax,
    total,
    selectedCustomer,
    modalOpen,
    setModalOpen,
    paymentMethods,
}: CartDetailsProps) {
    const [deliveryDate, setDeliveryDate] = useState<string>('');
    const [amountReceived, setAmountReceived] = useState<string>('');

    const receivedAmount = amountReceived === '' ? 0 : Number(amountReceived);
    const changeAmount = receivedAmount - total;
    const hasAmountReceived = amountReceived !== '';

    const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // ✅ État de chargement

    console.log('customer', selectedCustomer);

    useEffect(() => {
        setAmountReceived(String(total));
    }, [total]);

    useEffect(() => {
        if (modalOpen) {
            setAmountReceived(String(total));
        }
    }, [modalOpen, total]);

    const handleSelect = (method: number) => {
        setSelectedMethod(method);
    };

    const handlePayment = () => {
        if (!selectedMethod) {
            toast.error('Veuillez sélectionner un mode de paiement');
            return;
        }

        const received = parseFloat(amountReceived);
        if (isNaN(received) || received <= 0) {
            toast.error('Veuillez entrer un montant valide');
            return;
        }

        // if (selectedCustomer == null) {
        //     toast.error('Veuillez selectionner un client');
        //     return;
        // }

        setIsSubmitting(true);

        router.post(
            orders.store.url(),
            {
                customer_id: selectedCustomer?.id,
                delivery_at: deliveryDate || null,
                payment_method_id: selectedMethod,
                amount_received: received,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setModalOpen(false);
                    toast.success('Commande enregistrée !', {
                        duration: 3000,
                        icon: '✅',
                    });
                },
                onError: (errors) => {
                    console.error('Erreur de validation :', errors);
                    const firstError = errors ? Object.values(errors)[0] : 'Une erreur inconnue est survenue';
                    toast.error(typeof firstError === 'string' ? firstError : 'Erreur lors de la validation');
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-14 w-full rounded-xl text-base font-semibold" disabled={!itemCount}>
                    Valider
                </Button>
            </DialogTrigger>

            <DialogContent className="dialog-xl !max-w-2xl rounded-2xl border-slate-200 p-0">
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle>Resume de la commande</DialogTitle>
                        <DialogDescription>Verifiez les details de la vente avant validation.</DialogDescription>
                    </DialogHeader>

                    {selectedCustomer && (
                        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">Client sélectionné</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
                                    <span className="text-sm font-semibold text-slate-600">{selectedCustomer.fullname.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{selectedCustomer.fullname}</p>
                                    <p className="text-sm text-slate-600">{selectedCustomer.phone}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
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

                        <Separator className="my-4 bg-slate-200" />

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="delivery_date" className="text-sm font-medium text-slate-900">
                                    Date de livraison
                                </label>
                                <Input
                                    id="delivery_date"
                                    type="date"
                                    value={deliveryDate}
                                    onChange={(event) => setDeliveryDate(event.target.value)}
                                    className="h-11 rounded-xl border-slate-200 bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="amount_received" className="text-sm font-medium text-slate-900">
                                    Montant recu
                                </label>
                                <Input
                                    id="amount_received"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={amountReceived}
                                    onChange={(event) => setAmountReceived(event.target.value)}
                                    placeholder="Entrez le montant recu"
                                    className="h-11 rounded-xl border-slate-200 bg-white"
                                />

                                {hasAmountReceived ? (
                                    <div
                                        className={
                                            changeAmount >= 0
                                                ? 'rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700'
                                                : 'rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700'
                                        }
                                    >
                                        {changeAmount >= 0
                                            ? `Montant a rendre : ${formatCurrency(changeAmount)}`
                                            : `Reste a encaisser : ${formatCurrency(Math.abs(changeAmount))}`}
                                    </div>
                                ) : null}
                            </div>
                            <div className="pt-4">
                                <h4 className="mb-3 flex items-center text-sm font-semibold text-gray-700">
                                    <Wallet className="mr-2 h-4 w-4" /> Mode de paiement
                                </h4>
                                <PaymentMethod onSelect={handleSelect} paymentMethods={paymentMethods} />
                            </div>
                            <div className="pt-4">
                                <Button
                                    className="w-full rounded-xl py-6 font-bold transition-all duration-200 disabled:bg-gray-400"
                                    onClick={handlePayment}
                                    disabled={isSubmitting} // ✅ Désactiver pendant l'envoi
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            En cours...
                                        </>
                                    ) : (
                                        <>Confirmer & Payer</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
