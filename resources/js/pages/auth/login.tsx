import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Key, LoaderCircle, Phone } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    phone: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        phone: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Bon retour 👋" description="Entrez vos identifiants pour accéder à votre espace.">
            <Head title="Connexion" />

            {status && (
                <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-5">
                {/* Phone */}
                <div className="grid gap-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                        Téléphone
                    </Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400 pointer-events-none">
                            <Phone className="h-4 w-4" />
                        </span>
                        <Input
                            id="phone"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="701234567"
                            className="pl-10 h-11 rounded-xl border-neutral-200 bg-neutral-50 focus:bg-white transition-colors"
                        />
                    </div>
                    <InputError message={errors.phone} />
                </div>

                {/* Password */}
                <div className="grid gap-1.5">
                    <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
                        Mot de passe
                    </Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400 pointer-events-none">
                            <Key className="h-4 w-4" />
                        </span>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-11 rounded-xl border-neutral-200 bg-neutral-50 focus:bg-white transition-colors"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                <Button
                    type="submit"
                    tabIndex={3}
                    disabled={processing}
                    className="h-11 w-full rounded-xl bg-yellow-500 font-semibold text-neutral-900 hover:bg-yellow-400 active:scale-[0.98] transition-all shadow-sm shadow-yellow-200 cursor-pointer"
                >
                    {processing ? (
                        <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Connexion…
                        </>
                    ) : (
                        'Se connecter'
                    )}
                </Button>
            </form>
        </AuthLayout>
    );
}
