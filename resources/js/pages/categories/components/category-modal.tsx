import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import categoriesRoutes from '@/routes/categories';
import { Category } from '@/types';
import { Form } from '@inertiajs/react';
import { LoaderCircle, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    category?: Category | null;
}

export default function CategoryModal({ open, onClose, category = null }: CategoryModalProps) {
    const isEditing = Boolean(category);
    const [preview, setPreview] = useState<string | null>(null);
    const [isShop, setIsShop] = useState(false);

    useEffect(() => {
        if (open && category) {
            setIsShop(Boolean(category.is_shop));
            setPreview(category.image_url ?? null);
        } else if (!open) {
            setPreview(null);
            setIsShop(false);
        }
    }, [open, category]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else if (category?.image_url) {
            setPreview(category.image_url);
        } else {
            setPreview(null);
        }
    };

    const clearImage = () => {
        setPreview(null);
        const input = document.getElementById('category-image') as HTMLInputElement;
        if (input) input.value = '';
    };

    const handleSuccess = () => {
        toast.success(isEditing ? 'Catégorie mise à jour avec succès !' : 'Catégorie créée avec succès !', {
            duration: 3000,
            icon: '✅',
        });
        setPreview(null);
        setIsShop(false);
        onClose();
    };

    const handleError = (errors: Record<string, string>) => {
        const firstError = errors ? Object.values(errors)[0] : 'Une erreur est survenue';

        toast.error(
            typeof firstError === 'string' ? firstError : isEditing ? 'Erreur lors de la mise à jour de la catégorie' : 'Erreur lors de la création de la catégorie',
            {
                duration: 4000,
                icon: '❌',
            },
        );
    };

    const formProps = isEditing && category ? categoriesRoutes.update.form(category.id) : categoriesRoutes.store.form();

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden rounded-2xl p-0 sm:max-w-[550px]">
                <div className="px-6 py-5">
                    <DialogHeader className="flex flex-row items-center justify-between border-b">
                        <div>
                            <DialogTitle className="text-xl font-bold">{isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</DialogTitle>
                            <p className="text-gray mt-1 text-sm">
                                {isEditing ? 'Mettez à jour les informations de la catégorie' : 'Ajoutez une catégorie à votre catalogue'}
                            </p>
                        </div>
                        <button onClick={onClose} className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30">
                            <X className="h-5 w-5" />
                        </button>
                    </DialogHeader>
                </div>

                <Form
                    key={category?.id ?? 'new'}
                    {...formProps}
                    resetOnSuccess={!isEditing ? ['name', 'image'] : undefined}
                    disableWhileProcessing
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="space-y-6 p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="category-image" className="text-sm font-medium text-gray-700">
                                    Image de la catégorie
                                </Label>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <label
                                        htmlFor="category-image"
                                        className="group hover:border-primary hover:bg-primary-50 relative flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-all"
                                    >
                                        <Upload className="group-hover:text-primary-500 text-primary-400 mx-auto mb-2 h-8 w-8" />
                                        <span className="text-sm font-medium text-gray-700">Cliquez pour importer</span>
                                        <span className="mt-1 text-xs text-gray-500">PNG, JPG jusqu'à 10MB</span>
                                        <Input id="category-image" type="file" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
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

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Nom de la catégorie <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    name="name"
                                    defaultValue={category?.name ?? ''}
                                    placeholder="Ex: Électronique"
                                    className={`w-full border-gray-300 ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <InputError message={errors.name} className="mt-1 text-sm" />}
                            </div>

                            <div className="flex items-center gap-3">
                                <input type="hidden" name="is_shop" value={isShop ? '1' : '0'} />
                                <Checkbox id="is_shop" checked={isShop} onCheckedChange={(checked) => setIsShop(checked === true)} />
                                <Label htmlFor="is_shop" className="text-sm font-medium text-gray-700">
                                    Afficher dans la boutique
                                </Label>
                            </div>

                            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                                <Button type="button" variant="outline" onClick={onClose} className="px-6 py-2 text-gray-700 hover:bg-gray-50">
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={processing} className="rounded-lg px-6 py-2 font-medium shadow-sm transition hover:shadow">
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : isEditing ? (
                                        'Mettre à jour'
                                    ) : (
                                        'Enregistrer la catégorie'
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
