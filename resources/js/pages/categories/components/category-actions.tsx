import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import categoriesRoutes from '@/routes/categories';
import { Category } from '@/types';
import { router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CategoryActionsProps {
    category: Category;
    onEdit: (category: Category) => void;
}

export function CategoryActions({ category, onEdit }: CategoryActionsProps) {
    const confirm = useConfirm();

    const handleDelete = async () => {
        await confirm.confirm({
            title: 'Supprimer cette catégorie ?',
            description: 'Cette action est irréversible. Les produits liés seront également affectés.',
            variant: 'destructive',
            cancelText: 'Annuler',
            confirmText: 'Supprimer',
            onConfirm: async () => {
                router.delete(categoriesRoutes.destroy.url(category.id), {
                    onSuccess: () => toast.success('Catégorie supprimée'),
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
                onClick={() => onEdit(category)}
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
