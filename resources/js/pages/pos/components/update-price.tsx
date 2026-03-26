import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import cart from '@/routes/cart';
import { Product } from '@/types';
import { router } from '@inertiajs/react';
import { LoaderCircle, PencilLineIcon } from 'lucide-react';
import { useState } from 'react';
export default function UpdatePrice({
    open,
    setModalOpenPrice,
    product,
}: {
    open: boolean;
    setModalOpenPrice: (open: boolean) => void;
    product: Product;
}) {
    const [price, setPrice] = useState<string>(product.price.toString());

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        router.post(
            cart.updatePrice.url(),
            {
                price: price === '' ? 0 : parseFloat(price),
                product_id: product.id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setModalOpenPrice(false);
                    setProcessing(false);
                },
                onError: (errors) => {
                    setErrors(errors);
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setModalOpenPrice}>
            <DialogTrigger asChild>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer font-bold">
                    <PencilLineIcon className="h-3 w-3" />
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifier le prix : {product.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="price">Prix (FCFA)</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            placeholder="Ex: 19.99"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && <InputError message={errors.price} />}
                    </div>
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Mise à jour...
                            </>
                        ) : (
                            'Mettre à jour le prix'
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
