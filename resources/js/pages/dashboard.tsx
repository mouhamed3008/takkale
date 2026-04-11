import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import orders from '@/routes/orders';
import { BreadcrumbItem, Order } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CalendarDays, CheckCircle2, Clock, Eye, Package, ShoppingBag, Truck, Wallet, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    cashBalance: number;
    todayRevenue: number;
    todayOrdersCount: number;
    deliveriesDueTodayCount: number;
    deliveriesToday: Order[];
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        maximumFractionDigits: 0,
    }).format(value);

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }).format(date);
};

// --- Composants Internes pour la propreté ---

const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    colorClass,
}: {
    title: string;
    value: string;
    description: string;
    icon: any;
    colorClass: string;
}) => (
    <Card className="border-slate-200 transition-all duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col">
                <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
                <CardDescription className="mt-1 text-xs text-slate-500">{description}</CardDescription>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`}>
                <Icon className="h-6 w-6" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold tracking-tight text-slate-900">{value}</div>
        </CardContent>
    </Card>
);

const StatusBadge = ({ status }: { status: string }) => {
    const config = {
        new: { label: 'Nouveau', className: 'bg-blue-50 text-blue-700 border-blue-100', icon: Clock },
        finished: { label: 'Terminé', className: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: CheckCircle2 },
        cancelled: { label: 'Annulé', className: 'bg-rose-50 text-rose-700 border-rose-100', icon: XCircle },
        processing: { label: 'En cours', className: 'bg-amber-50 text-amber-700 border-amber-100', icon: Package },
    };

    // @ts-ignore
    const { label, className, icon: Icon } = config[status] || config.new;

    return (
        <Badge variant="outline" className={`flex items-center gap-1.5 font-medium ${className}`}>
            <Icon className="h-3 w-3" />
            {label}
        </Badge>
    );
};

const PaymentBadge = ({ paid }: { paid?: boolean }) => {
    return (
        <Badge
            variant="outline"
            className={`flex items-center gap-1.5 font-medium ${
                paid ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : 'border-amber-100 bg-amber-50 text-amber-700'
            }`}
        >
            {paid ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
            {paid ? 'Payé' : 'En attente'}
        </Badge>
    );
};

const CustomerAvatar = ({ name }: { name: string }) => {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600">
                {initials}
            </div>
            <span className="font-medium text-slate-700">{name}</span>
        </div>
    );
};

// --- Composant Principal ---

export default function Dashboard({ cashBalance, todayRevenue, todayOrdersCount, deliveriesDueTodayCount, deliveriesToday }: DashboardProps) {
    const todayDate = formatDate(new Date());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="flex min-h-screen flex-1 flex-col gap-8 bg-slate-50/50 p-5 md:p-8">
                {/* En-tête de page */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Tableau de bord</h1>
                    <p className="text-slate-500">{todayDate} • Vue d'ensemble de l'activité</p>
                </div>

                {/* Cartes Statistiques */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Caisse Actuelle"
                        value={formatCurrency(cashBalance)}
                        description="Solde total disponible"
                        icon={Wallet}
                        colorClass="bg-indigo-50 text-indigo-600"
                    />
                    <StatCard
                        title="Revenus du Jour"
                        value={formatCurrency(todayRevenue)}
                        description="Encaissements aujourd'hui"
                        icon={CalendarDays}
                        colorClass="bg-emerald-50 text-emerald-600"
                    />
                    <StatCard
                        title="Commandes"
                        value={todayOrdersCount.toString()}
                        description="Nouvelles commandes"
                        icon={ShoppingBag}
                        colorClass="bg-blue-50 text-blue-600"
                    />
                    <StatCard
                        title="Livraisons"
                        value={deliveriesDueTodayCount.toString()}
                        description="À livrer aujourd'hui"
                        icon={Truck}
                        colorClass="bg-amber-50 text-amber-600"
                    />
                </div>

                {/* Section Tableau des Livraisons */}
                <Card className="overflow-hidden border-slate-200 shadow-sm">
                    <CardHeader className="border-b border-slate-100 bg-white px-6 py-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="text-lg">Livraisons du jour</CardTitle>
                                <CardDescription>Suivez l'état des {deliveriesDueTodayCount} commandes prévues.</CardDescription>
                            </div>
                            <Button
                                onClick={() => router.visit(orders.index.url())}
                                variant="outline"
                                className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            >
                                Voir toutes les commandes
                            </Button>
                        </div>
                    </CardHeader>

                    <div className="p-0">
                        {deliveriesToday.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                    <Truck className="h-8 w-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Aucune livraison prévue</h3>
                                <p className="mt-1 max-w-sm text-sm text-slate-500">
                                    Vous n'avez pas de commandes à livrer pour le moment. Profitez-en pour mettre à jour votre stock.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Code</th>
                                            <th className="px-6 py-3 font-medium">Client</th>
                                            <th className="px-6 py-3 font-medium">Montant</th>
                                            <th className="px-6 py-3 font-medium">Paiement</th>
                                            <th className="px-6 py-3 font-medium">Statut</th>
                                            <th className="px-6 py-3 text-right font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {deliveriesToday.map((order) => (
                                            <tr key={order.id} className="group transition-colors hover:bg-slate-50/80">
                                                <td className="px-6 py-4 font-mono text-xs font-medium text-slate-500">#{order.code}</td>
                                                <td className="px-6 py-4">
                                                    <CustomerAvatar name={order.customer?.fullname ?? 'Client Inconnu'} />
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-slate-900">
                                                    {formatCurrency(Number(order.amount) || 0)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <PaymentBadge paid={order.payment_status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={order.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => router.visit(orders.show.url(order.id))}
                                                        className="h-8 w-8 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
                                                        aria-label="Voir la commande"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
