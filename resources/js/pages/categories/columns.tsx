import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CategoryActions } from './components/category-actions';

const formatDate = (value: string) =>
    new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));

const getShopStatusStyles = (isShop: boolean) => {
    if (isShop) {
        return 'border-blue-100 bg-blue-50 text-blue-700';
    }

    return 'border-slate-100 bg-slate-50 text-slate-600';
};

interface CreateColumnsOptions {
    onEdit: (category: Category) => void;
}

export const createColumns = ({ onEdit }: CreateColumnsOptions): ColumnDef<Category>[] => [
    {
        id: 'select',
        header: () => <Checkbox aria-label="Tout sélectionner" className="border-slate-300" />,
        cell: () => <Checkbox aria-label="Sélectionner la catégorie" className="border-slate-300" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: 'Nom',
        cell: ({ row }) => {
            const category = row.original;

            return (
                <div className="flex min-w-[240px] items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                        {category.image ? (
                            <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400">
                                {category.name.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <p className="font-semibold text-slate-900">{category.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'is_shop',
        header: 'Boutique',
        cell: ({ row }) => (
            <Badge className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${getShopStatusStyles(Boolean(row.original.is_shop))}`}>
                {row.original.is_shop ? 'Oui' : 'Non'}
            </Badge>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Créé le',
        cell: ({ row }) => <span className="text-sm text-slate-500">{formatDate(row.original.created_at)}</span>,
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <CategoryActions category={row.original} onEdit={onEdit} />,
    },
];
