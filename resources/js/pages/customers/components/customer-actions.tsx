import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import customersRoutes from '@/routes/customers';
import { Customer } from '@/types';
import { router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CustomerActionsProps {
    customer: Customer;
    onEdit: (customer: Customer) => void;
}

export function CustomerActions({ customer, onEdit }: CustomerActionsProps) {
    const confirm = useConfirm();

    const handleDelete = async () => {
        await confirm.confirm({
            title: 'Supprimer ce client ?',
            description: 'Cette action est irréversible et le client sera retiré de votre base.',
            variant: 'destructive',
            cancelText: 'Annuler',
            confirmText: 'Supprimer',
            onConfirm: async () => {
                router.delete(customersRoutes.destroy.url(customer.id), {
                    onSuccess: () => toast.success('Client supprimé'),
                    onError: () => toast.error('Erreur lors de la suppression'),
                });
            },
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(customer)}
                className="rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100"
            >
                <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} className="rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
