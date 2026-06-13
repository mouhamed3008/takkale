import ProductController from '@/actions/App/Http/Controllers/Product/ProductController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, Product } from '@/types';
import { Form } from '@inertiajs/react';
import { LoaderCircle, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    categories: Category[];
    product?: Product | null;
}

export default function ProductModal({ open, onClose, categories, product = null }: ProductModalProps) {
    const isEditing = Boolean(product);
    const [preview, setPreview] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        if (open && product) {
            const productCategoryId = product.category_id ?? product.category?.id;
            setCategoryId(productCategoryId ? String(productCategoryId) : '');
            setPreview(product.image_url ?? null);
        } else if (!open) {
            setPreview(null);
            setCategoryId('');
        }
    }, [open, product]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else if (product?.image_url) {
            setPreview(product.image_url);
        } else {
            setPreview(null);
        }
    };

    const clearImage = () => {
        setPreview(null);
        const input = document.getElementById('image') as HTMLInputElement;
        if (input) input.value = '';
    };

    const handleSuccess = () => {
        toast.success(isEditing ? 'Produit mis à jour avec succès !' : 'Produit créé avec succès !', {
            duration: 3000,
            icon: '✅',
        });
        setPreview(null);
        setCategoryId('');
        onClose();
    };

    const handleError = (errors: Record<string, string>) => {
        const firstError = errors ? Object.values(errors)[0] : 'Une erreur est survenue';
        console.log(firstError);

        toast.error(
            typeof firstError === 'string' ? firstError : isEditing ? 'Erreur lors de la mise à jour du produit' : 'Erreur lors de la création du produit',
            {
                duration: 4000,
                icon: '❌',
            },
        );
    };

    const formProps = isEditing && product ? ProductController.update.form(product.id) : ProductController.store.form();

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden rounded-2xl p-0 sm:max-w-[550px]">
                <div className="px-6 py-5">
                    <DialogHeader className="flex flex-row items-center justify-between border-b">
                        <div>
                            <DialogTitle className="text-xl font-bold">{isEditing ? 'Modifier le produit' : 'Nouveau produit'}</DialogTitle>
                            <p className="text-gray mt-1 text-sm">
                                {isEditing ? 'Mettez à jour les informations du produit' : 'Ajoutez un produit à votre catalogue'}
                            </p>
                        </div>
                        <button onClick={onClose} className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30">
                            <X className="h-5 w-5" />
                        </button>
                    </DialogHeader>
                </div>

                <Form
                    key={product?.id ?? 'new'}
                    {...formProps}
                    resetOnSuccess={!isEditing ? ['name', 'price', 'category_id', 'image'] : undefined}
                    disableWhileProcessing
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="space-y-6 p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                                    Image du produit
                                </Label>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <label
                                        htmlFor="image"
                                        className="group hover:border-primary hover:bg-primary-50 relative flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-all"
                                    >
                                        <Upload className="group-hover:text-primary-500 text-primary-400 mx-auto mb-2 h-8 w-8" />
                                        <span className="text-sm font-medium text-gray-700">Cliquez pour importer</span>
                                        <span className="mt-1 text-xs text-gray-500">PNG, JPG jusqu'à 10MB</span>
                                        <Input id="image" type="file" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>

                                    {preview && (
                                        <div className="relative h-32 w-full overflow-hidden rounded-xl border bg-white sm:w-48">
                                            <img src={preview} alt="Aperçu" className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={clearImage}
                                                className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white transition hover:bg-red-600"
                                                title="Supprimer l'image"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <InputError message={errors.image} className="mt-2 text-sm" />}
                            </div>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Nom du produit <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        name="name"
                                        defaultValue={product?.name ?? ''}
                                        placeholder="Ex: Pantalon"
                                        className={`w-full border-gray-300 ${errors.name ? 'border-red-500' : ''}`}
                                    />
                                    {errors.name && <InputError message={errors.name} className="mt-1 text-sm" />}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                                        Prix (FCFA) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        required
                                        tabIndex={2}
                                        name="price"
                                        defaultValue={product?.price ?? ''}
                                        placeholder="Ex: 1500"
                                        min="0"
                                        className={`w-full border-gray-300 ${errors.price ? 'border-red-500' : ''}`}
                                    />
                                    {errors.price && <InputError message={errors.price} className="mt-1 text-sm" />}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category_id" className="text-sm font-medium text-gray-700">
                                    Catégorie <span className="text-red-500">*</span>
                                </Label>
                                <Select value={categoryId} onValueChange={setCategoryId}>
                                    <SelectTrigger
                                        id="category_id"
                                        className={`w-full border-gray-300 focus:border-primary focus-visible:ring-0 ${errors.category_id ? 'border-red-500' : ''}`}
                                    >
                                        <SelectValue placeholder="Sélectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="category_id" value={categoryId} required />
                                {errors.category_id && <InputError message={errors.category_id} className="mt-1 text-sm" />}
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                                <Button type="button" variant="outline" onClick={onClose} className="px-6 py-2 text-gray-700 hover:bg-gray-50">
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg px-6 py-2 font-medium shadow-sm transition hover:shadow"
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : isEditing ? (
                                        'Mettre à jour'
                                    ) : (
                                        'Enregistrer le produit'
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
