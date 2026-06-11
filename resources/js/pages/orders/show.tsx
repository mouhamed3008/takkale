import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency } from '@/lib/utils';
import orders from '@/routes/orders';
import { BreadcrumbItem, Order, PaymentMethods } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle, CreditCard, MapPin, Package, Phone, User, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Commandes', href: orders.index.url() },
    { title: 'Détails', href: '#' },
];

interface OrderShowProps {
    order: Order;
    paymentMethods: PaymentMethods[];
}

const getStatusBadge = (status: string) => {
    if (status === 'new') return { variant: 'bg-amber-50 text-amber-700 border border-amber-100', label: 'Nouveau' };
    if (status === 'finished') return { variant: 'bg-emerald-50 text-emerald-700 border border-emerald-100', label: 'Terminé' };
    if (status === 'cancelled') return { variant: 'bg-rose-50 text-rose-700 border border-rose-100', label: 'Annulé' };
    return { variant: 'bg-slate-50 text-slate-500 border border-slate-100', label: status };
};

export default function Show({ order, paymentMethods }: OrderShowProps) {
    const statusInfo = getStatusBadge(order.status ?? '');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [encaissementOpen, setEncaissementOpen] = useState(false);

    const remaining = parseFloat(order.amount) - Number(order.amount_received);
    const isPartiallyPaid = !order.payment_status && remaining > 0;

    const form = useForm({
        product_ids: [] as number[],
        amount_paid: '',
        payment_method_id: '',
    });

    const nonRecoveredProducts = (order.products ?? []).filter((p) => !p.pivot?.is_recovered);
    const recoveredProducts = (order.products ?? []).filter((p) => p.pivot?.is_recovered);

    const toggleProduct = (productId: number) => {
        setSelectedIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
    };

    const toggleAll = () => {
        const allIds = nonRecoveredProducts.map((p) => p.id);
        setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
    };

    const openRecovery = (productIds: number[]) => {
        form.setData('product_ids', productIds);
        form.setData('amount_paid', isPartiallyPaid ? remaining.toString() : '');
        form.setData('payment_method_id', '');
        if (isPartiallyPaid) {
            setEncaissementOpen(true);
        } else {
            submitRecover(productIds, '', '');
        }
    };

    const submitRecover = (productIds: number[], amountPaid: string, paymentMethodId: string) => {
        router.post(
            `/orders/${order.id}/recover`,
            {
                product_ids: productIds,
                amount_paid: amountPaid || undefined,
                payment_method_id: paymentMethodId || undefined,
            },
            {
                onSuccess: () => {
                    toast.success('Récupération enregistrée avec succès');
                    setEncaissementOpen(false);
                    setSelectedIds([]);
                    router.reload();
                },
                onError: () => {
                    toast.error('Erreur lors de la récupération');
                },
            },
        );
    };

    const handleEncaissementSubmit = () => {
        submitRecover(form.data.product_ids, form.data.amount_paid, form.data.payment_method_id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Commande ${order.code}`} />

            <div className="flex flex-1 flex-col">
                <div className="min-h-full p-5 md:p-7">
                    <div className="mx-auto w-full">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="sm" onClick={() => router.get(orders.index.url())} className="rounded-2xl">
                                    <ArrowLeft className="h-4 w-4" />
                                    Retour
                                </Button>
                                <div>
                                    <h1 className="text-2xl font-semibold text-slate-950">Commande {order.code}</h1>
                                    <p className="text-sm text-slate-500">Créée le {new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                                </div>
                            </div>
                            <Badge className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${statusInfo.variant}`}>{statusInfo.label}</Badge>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            <Card className="border-none shadow-none lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Informations client
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="font-medium text-slate-900">{order.customer?.fullname || 'Client inconnu'}</p>
                                        {order.customer?.email && <p className="text-sm text-slate-500">{order.customer.email}</p>}
                                        {order.customer?.phone && (
                                            <p className="flex items-center gap-1 text-sm text-slate-500">
                                                <Phone className="h-3 w-3" />
                                                {order.customer.phone}
                                            </p>
                                        )}
                                    </div>
                                    {order.customer?.address && (
                                        <div className="flex items-start gap-2 text-sm text-slate-600">
                                            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                            <span>{order.customer.address}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-none lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Détails de la commande
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                <span className="font-medium">Date de livraison:</span>
                                            </div>
                                            <p className="ml-6 text-sm text-slate-600">
                                                {order.delivery_at ? new Date(order.delivery_at).toLocaleDateString('fr-FR') : 'Non spécifiée'}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CreditCard className="h-4 w-4 text-slate-400" />
                                                <span className="font-medium">Paiement:</span>
                                            </div>
                                            <div className="ml-6 flex items-center gap-2">
                                                <span className="text-sm text-slate-600">{order.payment_method?.name || 'Méthode inconnue'}</span>
                                                {order.payment_status ? (
                                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                                ) : (
                                                    <XCircle className="h-4 w-4 text-rose-500" />
                                                )}
                                            </div>
                                            {isPartiallyPaid && (
                                                <p className="ml-6 text-sm font-medium text-rose-600">Reste à payer: {formatCurrency(remaining)}</p>
                                            )}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="font-medium text-slate-900">Articles commandés</h3>
                                            {order.status !== 'finished' && nonRecoveredProducts.length > 0 && (
                                                <button
                                                    onClick={toggleAll}
                                                    className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-800"
                                                >
                                                    {selectedIds.length === nonRecoveredProducts.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            {order.products?.map((product) => {
                                                const pivot = product.pivot;
                                                const isRecovered = pivot?.is_recovered ?? false;
                                                const isSelected = selectedIds.includes(product.id);

                                                return (
                                                    <div
                                                        key={product.id}
                                                        className={`border-primary flex items-center justify-between rounded-lg border-1 p-3 transition-colors ${
                                                            isRecovered ? 'bg-emerald-50' : isSelected ? 'bg-blue-50' : 'bg-slate-50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {order.status !== 'finished' && !isRecovered && (
                                                                <Checkbox checked={isSelected} onCheckedChange={() => toggleProduct(product.id)} />
                                                            )}
                                                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                                                                {product.image_url ? (
                                                                    <img
                                                                        src={product.image_url}
                                                                        alt={product.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="text-xs font-semibold text-slate-400">
                                                                        {product.name.slice(0, 2).toUpperCase()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-slate-900">{product.name}</p>
                                                                <p className="text-sm text-slate-500">Quantité: {pivot?.quantity || 0}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-right">
                                                                <p className="font-medium text-slate-900">
                                                                    {formatCurrency((pivot?.unit_price || 0) * (pivot?.quantity || 0))}
                                                                </p>
                                                                <p className="text-sm text-slate-500">
                                                                    {formatCurrency(pivot?.unit_price || 0)} / unité
                                                                </p>
                                                            </div>
                                                            {isRecovered && (
                                                                <Badge className="rounded-xl border border-emerald-200 bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                                                                    Récupéré
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {recoveredProducts.length > 0 && nonRecoveredProducts.length > 0 && (
                                            <p className="mt-2 text-xs text-slate-400">
                                                {recoveredProducts.length} / {order.products?.length} article(s) récupéré(s)
                                            </p>
                                        )}
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-slate-900">Montant total</span>
                                            <span className="text-xl font-semibold text-slate-900">{formatCurrency(order.amount)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-slate-500">
                                            <span>Montant reçu</span>
                                            <span>{formatCurrency(order.amount_received)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {order.status !== 'finished' && (
                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
                                            router.delete(orders.destroy.url(order.id));
                                        }
                                    }}
                                    className="rounded-2xl"
                                >
                                    Supprimer
                                </Button>

                                {selectedIds.length > 0 && selectedIds.length < nonRecoveredProducts.length && (
                                    <Button variant="outline" onClick={() => openRecovery(selectedIds)} className="rounded-2xl">
                                        Récupérer la sélection ({selectedIds.length})
                                    </Button>
                                )}

                                {nonRecoveredProducts.length > 0 && (
                                    <Button onClick={() => openRecovery([])} className="rounded-2xl">
                                        Récupérer tout
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={encaissementOpen} onOpenChange={setEncaissementOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Encaissement</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <p className="text-sm text-slate-600">
                            La commande n'est pas entièrement payée. Vous pouvez encaisser le solde restant avant la récupération.
                        </p>

                        <div className="rounded-lg bg-rose-50 px-4 py-3">
                            <p className="text-sm font-medium text-rose-700">Reste à payer: {formatCurrency(remaining)}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount_paid">Montant encaissé</Label>
                            <Input
                                id="amount_paid"
                                type="number"
                                min="0"
                                max={remaining}
                                step="0.01"
                                value={form.data.amount_paid}
                                onChange={(e) => form.setData('amount_paid', e.target.value)}
                                placeholder={remaining.toFixed(2)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="payment_method">Mode de paiement</Label>
                            <Select value={form.data.payment_method_id} onValueChange={(value) => form.setData('payment_method_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir un mode de paiement" />
                                </SelectTrigger>
                                <SelectContent>
                                    {paymentMethods.map((method) => (
                                        <SelectItem key={method.id} value={String(method.id)}>
                                            {method.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => submitRecover(form.data.product_ids, '', '')} className="rounded-2xl">
                            Récupérer sans encaisser
                        </Button>
                        <Button
                            onClick={handleEncaissementSubmit}
                            disabled={!form.data.amount_paid || !form.data.payment_method_id || form.processing}
                            className="rounded-2xl"
                        >
                            Encaisser et récupérer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
