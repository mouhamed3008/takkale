import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useConfirm } from '@/hooks/use-confirm';
import orders from '@/routes/orders';
import { Order } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Package, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const getStatusBadge = (status: string) => {
    if (status === 'new') return 'bg-amber-50 text-amber-700 border border-amber-100';
    if (status === 'finished') return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    if (status === 'cancelled') return 'bg-rose-50 text-rose-700 border border-rose-100';

    return 'bg-slate-50 text-slate-500 border border-slate-100';
};

function OrderActions({ order }: { order: Order }) {
    const confirm = useConfirm();

    const handleRecover = async () => {
        await confirm.confirm({
            title: 'Récupérer cette commande ?',
            description: 'La commande sera marquée comme terminée et ne pourra plus être modifiée.',
            variant: 'default',
            cancelText: 'Annuler',
            confirmText: 'Récupérer',
            onConfirm: async () => {
                router.patch(
                    orders.changeStatus.url(order.id),
                    {},
                    {
                        onSuccess: () => {
                            toast.success('Commande récupérée avec succès');
                            // Recharger la page pour mettre à jour les données
                            router.reload();
                        },
                        onError: () => {
                            toast.error('Erreur lors de la récupération');
                        },
                    },
                );
            },
        });
    };

    // Ne pas afficher les boutons si la commande est déjà terminée
    if (order.status === 'finished') {
        return (
            <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.visit(orders.show.url(order.id))}
                                className="rounded-full bg-green-50 p-2 text-2xl text-green-500 transition"
                                aria-label="Voir la commande"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Voir la commande</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.visit(orders.show.url(order.id))}
                            className="rounded-full bg-green-50 p-2 text-2xl text-green-500 transition"
                            aria-label="Voir la commande"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Voir la commande</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.visit(orders.edit.url(order.id))}
                            className="rounded-full bg-blue-50 p-2 text-blue-500 transition"
                            aria-label="Modifier la commande"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Modifier la commande</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRecover}
                            className="rounded-full bg-purple-50 p-2 text-purple-500 transition"
                            aria-label="Récupérer la commande"
                        >
                            <Package className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Récupérer la commande</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {}}
                            className="rounded-full bg-rose-50 text-rose-600"
                            aria-label="Supprimer la commande"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Supprimer la commande</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export const columns: ColumnDef<Order>[] = [
    {
        id: 'code',
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.code}</span>,
    },
    {
        id: 'customer',
        header: 'Client',
        accessorFn: (row) => row.customer?.fullname ?? 'N/A',
        cell: ({ row }) => <span>{row.original.customer?.fullname ?? 'N/A'}</span>,
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Montant',
        cell: ({ row }) => (
            <span className="font-semibold text-slate-900">
                {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'XOF',
                    maximumFractionDigits: 0,
                }).format(Number(row.original.amount) || 0)}
            </span>
        ),
    },
    {
        id: 'payment_status',
        accessorKey: 'payment_status',
        header: 'Paiement',
        cell: ({ row }) => {
            const paid = Boolean(row.original.payment_status);
            return (
                <Badge
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                        paid ? 'border border-emerald-100 bg-emerald-50 text-emerald-700' : 'border border-rose-100 bg-rose-50 text-rose-700'
                    }`}
                >
                    {paid ? 'Payé' : 'Partiel'}
                </Badge>
            );
        },
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <Badge className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${getStatusBadge(row.original.status ?? '')}`}>
                {row.original.status ? row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1) : 'N/A'}
            </Badge>
        ),
    },
    {
        id: 'delivery_at',
        accessorKey: 'delivery_at',
        header: 'Date de livr.',
        cell: ({ row }) => {
            const dateCreated = row.original.created_at ? new Date(row.original.created_at) : null;
            const date = row.original.delivery_at ? new Date(row.original.delivery_at) : null;
            const createdFormatted = dateCreated ? dateCreated.toLocaleDateString('fr-FR') : '—';
            const deliveryFormatted = date ? date.toLocaleDateString('fr-FR') : '—';
            return (
                <span>
                    {createdFormatted} → {deliveryFormatted}
                </span>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <OrderActions order={row.original} />,
        enableSorting: false,
        enableHiding: false,
    },
];
