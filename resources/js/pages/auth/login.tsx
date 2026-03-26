import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Phone } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

import { Key } from 'lucide-react';

interface LoginForm {
    phone: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
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
        <AuthLayout title="Connexion" description="Entrez votre numéro de téléphone pour accéder à votre compte.">
            <Head title="Log in" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Telephone <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute top-1/2 left-3 -translate-y-1/2 font-bold text-gray-400">
                                <Phone className="h-5 w-5 font-bold" />
                            </div>
                            <Input
                                id="phone"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="701234567"
                                className="pl-11"
                            />
                        </div>
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mot de passe <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                                <Key className="h-5 w-5 font-bold" />
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                className="pl-11"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <Button type="submit" className="hover:bg-primary-500 w-full font-semibold text-gray-900" tabIndex={2} disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Se connecter
                    </Button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </p>
            </div>
        </AuthLayout>
    );
}
