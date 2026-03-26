import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-4">
            <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                <div className="relative hidden w-1/2 bg-black lg:flex">
                    <div className="absolute inset-0">
                        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-yellow-500/20 blur-3xl" />
                        <div className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-3xl" />
                        <div className="absolute bottom-20 left-10 h-64 w-64 rotate-45 rounded-xl bg-yellow-600/30" />
                        <div className="absolute right-20 bottom-40 h-40 w-40 rounded-xl bg-yellow-600/20" />
                    </div>

                    <img src="/images/woman.png" alt="" className="absolute bottom-0 h-[85%] w-full object-contain opacity-40" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="relative z-10 flex flex-col justify-end p-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl leading-tight font-bold text-yellow-400 xl:text-5xl"
                        >
                            Créez et vendez vos produits.
                        </motion.h2>
                    </div>
                </div>

                <div className="flex w-full flex-col lg:w-1/2">
                    <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
                        <Link href={route('home')} className="mb-10 flex items-center gap-2">
                            <AppLogoIcon className="size-8 text-yellow-500" />
                            <span className="text-2xl font-semibold text-gray-900">chariow</span>
                        </Link>

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                            {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
                        </div>

                        <div className="space-y-6">{children}</div>
                    </div>

                    <div className="flex items-center justify-between border-t px-6 py-4 text-xs text-gray-400 sm:px-10 lg:px-16">
                        <span>© 2025 {name}</span>
                        <a href="#" className="transition hover:text-gray-600">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
