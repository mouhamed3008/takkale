import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import products from '@/routes/products';
import { Product } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

const getProductStatusStyles = (active: boolean) => {
    if (active) {
        return 'border-emerald-100 bg-emerald-50 text-emerald-700';
    }

    return 'border-rose-100 bg-rose-50 text-rose-600';
};

export const columns: ColumnDef<Product>[] = [
    {
        id: 'select',
        header: () => <Checkbox aria-label="Select all products" className="border-slate-300" />,
        cell: () => <Checkbox aria-label="Select product" className="border-slate-300" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'product',
        header: 'Product Name',
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex min-w-[240px] items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400">
                                {product.name.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="font-semibold text-slate-900">{product.name}</p>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
            <span className="font-semibold text-slate-900">
                {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'XOF',
                    maximumFractionDigits: 0,
                }).format(Number(row.original.price) || 0)}
            </span>
        ),
    },
    {
        accessorKey: 'active',
        header: 'Status',
        cell: ({ row }) => (
            <Badge className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${getProductStatusStyles(Boolean(row.original.active))}`}>
                {row.original.active ? 'Actif' : 'Inactif'}
            </Badge>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => (
            <span className="text-sm text-slate-500">
                {new Intl.DateTimeFormat('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                }).format(new Date(row.original.created_at))}
            </span>
        ),
    },
    {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-slate-500 transition hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700">
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44 rounded-2xl border-slate-200 p-2">
                    <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
                        <a href={products.edit.url(row.original.id)} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            Modifier
                        </a>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="cursor-pointer rounded-xl text-rose-600 focus:text-rose-600"
                        onClick={() => {
                            if (confirm('Voulez-vous vraiment supprimer ce produit ? Cette action est irréversible.')) {
                                router.delete(products.destroy.url(row.original.id));
                            }
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
