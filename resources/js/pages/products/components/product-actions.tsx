// components/product-actions.tsx
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import products from '@/routes/products';
import { Product } from '@/types';
import { router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProductActions({ product }: { product: Product }) {
    const confirm = useConfirm();

    const handleDelete = async () => {
        await confirm.confirm({
            title: 'Supprimer ce produit ?',
            description: 'Cette action est irréversible et le produit sera perdu définitivement.',
            variant: 'destructive',
            cancelText: 'Annuler',
            confirmText: 'Supprimer',
            onConfirm: async () => {
                router.delete(products.destroy.url(product.id), {
                    onSuccess: () => toast.success('Produit supprimé'),
                    onError: () => toast.error('Erreur suppression'),
                });
            },
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.visit(products.edit.url(product.id))}
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
