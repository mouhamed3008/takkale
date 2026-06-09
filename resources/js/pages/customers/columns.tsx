import { Checkbox } from '@/components/ui/checkbox';
import { Customer } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CustomerActions } from './components/customer-actions';

const formatDate = (value: string) =>
    new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));

const EmptyValue = () => <span className="text-sm text-slate-400">—</span>;

interface CreateColumnsOptions {
    onEdit: (customer: Customer) => void;
}

export const createColumns = ({ onEdit }: CreateColumnsOptions): ColumnDef<Customer>[] => [
    {
        id: 'select',
        header: () => <Checkbox aria-label="Tout sélectionner" className="border-slate-300" />,
        cell: () => <Checkbox aria-label="Sélectionner le client" className="border-slate-300" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'fullname',
        header: 'Nom complet',
        cell: ({ row }) => {
            const customer = row.original;

            return (
                <div className="flex min-w-[220px] items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                        {customer.fullname.slice(0, 2).toUpperCase()}
                    </div>

                    <p className="font-semibold text-slate-900">{customer.fullname}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'phone',
        header: 'Téléphone',
        cell: ({ row }) => <span className="text-sm text-slate-700">{row.original.phone || <EmptyValue />}</span>,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <span className="text-sm text-slate-700">{row.original.email || <EmptyValue />}</span>,
    },
    {
        accessorKey: 'address',
        header: 'Adresse',
        cell: ({ row }) => <span className="text-sm text-slate-700">{row.original.address || <EmptyValue />}</span>,
    },
    {
        accessorKey: 'created_at',
        header: 'Créé le',
        cell: ({ row }) => <span className="text-sm text-slate-500">{formatDate(row.original.created_at)}</span>,
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <CustomerActions customer={row.original} onEdit={onEdit} />,
    },
];
