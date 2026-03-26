import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency } from '@/lib/utils';
import orders from '@/routes/orders';
import { BreadcrumbItem, Order } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle, CreditCard, MapPin, Package, Phone, User, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Commandes', href: orders.index.url() },
    { title: 'Détails', href: '#' },
];

interface OrderShowProps {
    order: Order;
}

const getStatusBadge = (status: string) => {
    if (status === 'new') return { variant: 'bg-amber-50 text-amber-700 border border-amber-100', label: 'Nouveau' };
    if (status === 'finished') return { variant: 'bg-emerald-50 text-emerald-700 border border-emerald-100', label: 'Terminé' };
    if (status === 'cancelled') return { variant: 'bg-rose-50 text-rose-700 border border-rose-100', label: 'Annulé' };
    return { variant: 'bg-slate-50 text-slate-500 border border-slate-100', label: status };
};

export default function Show({ order }: OrderShowProps) {
    const statusInfo = getStatusBadge(order.status ?? '');

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
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="mb-4 font-medium text-slate-900">Articles commandés</h3>
                                        <div className="space-y-3">
                                            {order.products?.map((product, index) => {
                                                const pivot = order.products[index]?.pivot;
                                                return (
                                                    <div
                                                        key={product.id}
                                                        className="border-primary flex items-center justify-between rounded-lg border-1 bg-slate-50 p-3"
                                                    >
                                                        <div className="flex items-center gap-3">
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
                                                        <div className="text-right">
                                                            <p className="font-medium text-slate-900">
                                                                {formatCurrency((pivot?.unit_price || 0) * (pivot?.quantity || 0))}
                                                            </p>
                                                            <p className="text-sm text-slate-500">{formatCurrency(pivot?.unit_price || 0)} / unité</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-900">Montant total</span>
                                        </div>
                                        <span className="text-xl font-semibold text-slate-900">{formatCurrency(order.amount)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            {/* <Button variant="outline" onClick={() => router.get(orders.edit.url(order.id))} className="rounded-2xl">
                                Modifier
                            </Button> */}
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

                            <Button
                                onClick={() => {
                                    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
                                        router.delete(orders.destroy.url(order.id));
                                    }
                                }}
                                className="rounded-2xl"
                            >
                                Recuperer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
