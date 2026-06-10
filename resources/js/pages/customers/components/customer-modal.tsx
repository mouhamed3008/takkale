import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import customersRoutes from '@/routes/customers';
import { Customer } from '@/types';
import { Form } from '@inertiajs/react';
import { LoaderCircle, X } from 'lucide-react';
import { toast } from 'sonner';

interface CustomerModalProps {
    open: boolean;
    onClose: () => void;
    customer?: Customer | null;
}

export default function CustomerModal({ open, onClose, customer = null }: CustomerModalProps) {
    const isEditing = Boolean(customer);

    const handleSuccess = () => {
        toast.success(isEditing ? 'Client mis à jour avec succès !' : 'Client créé avec succès !', {
            duration: 3000,
            icon: '✅',
        });
        onClose();
    };

    const handleError = (errors: Record<string, string>) => {
        const firstError = errors ? Object.values(errors)[0] : 'Une erreur est survenue';

        toast.error(typeof firstError === 'string' ? firstError : isEditing ? 'Erreur lors de la mise à jour du client' : 'Erreur lors de la création du client', {
            duration: 4000,
            icon: '❌',
        });
    };

    const formProps = isEditing && customer ? customersRoutes.update.form(customer.id) : customersRoutes.store.form();

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden rounded-2xl p-0 sm:max-w-[550px]">
                <div className="px-6 py-5">
                    <DialogHeader className="flex flex-row items-center justify-between border-b">
                        <div>
                            <DialogTitle className="text-xl font-bold">{isEditing ? 'Modifier le client' : 'Nouveau client'}</DialogTitle>
                            <p className="text-gray mt-1 text-sm">
                                {isEditing ? 'Mettez à jour les informations du client' : 'Ajoutez un client à votre base'}
                            </p>
                        </div>
                        <button onClick={onClose} className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30">
                            <X className="h-5 w-5" />
                        </button>
                    </DialogHeader>
                </div>

                <Form
                    key={customer?.id ?? 'new'}
                    {...formProps}
                    resetOnSuccess={!isEditing ? ['fullname', 'phone', 'email', 'address'] : undefined}
                    disableWhileProcessing
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="space-y-6 p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">
                                    Nom complet <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="fullname"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    name="fullname"
                                    defaultValue={customer?.fullname ?? ''}
                                    placeholder="Ex: Amadou Diallo"
                                    className={`w-full border-gray-300 ${errors.fullname ? 'border-red-500' : ''}`}
                                />
                                {errors.fullname && <InputError message={errors.fullname} className="mt-1 text-sm" />}
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                        Téléphone <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        name="phone"
                                        defaultValue={customer?.phone ?? ''}
                                        placeholder="Ex: 770000000"
                                        className={`w-full border-gray-300 ${errors.phone ? 'border-red-500' : ''}`}
                                    />
                                    {errors.phone && <InputError message={errors.phone} className="mt-1 text-sm" />}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        tabIndex={3}
                                        name="email"
                                        defaultValue={customer?.email ?? ''}
                                        placeholder="Ex: client@example.com"
                                        className={`w-full border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && <InputError message={errors.email} className="mt-1 text-sm" />}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                    Adresse
                                </Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    tabIndex={4}
                                    defaultValue={customer?.address ?? ''}
                                    placeholder="Ex: Dakar Plateau"
                                    className={`w-full border-gray-300 ${errors.address ? 'border-red-500' : ''}`}
                                />
                                {errors.address && <InputError message={errors.address} className="mt-1 text-sm" />}
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
                                        'Enregistrer le client'
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
