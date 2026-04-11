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
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl shadow-black/50 flex min-h-[600px]">

                {/* Left panel */}
                <div className="hidden lg:flex relative w-5/12 flex-col bg-neutral-900 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
                        {/* Grid lines */}
                        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Brand area at top */}
                    <div className="relative z-10 p-10">
                        <Link href={route('home')} className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500">
                                <AppLogoIcon className="size-6 text-neutral-900" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">{name}</span>
                        </Link>
                    </div>

                    {/* Center content */}
                    <div className="relative z-10 flex flex-1 flex-col justify-center px-10 pb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            {/* Decorative icon */}
                            <div className="mb-8 flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-1 rounded-full bg-yellow-500"
                                        initial={{ width: 8 }}
                                        animate={{ width: i === 0 ? 32 : 8 }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>

                            <h2 className="text-3xl font-bold text-white leading-snug">
                                Gérez votre pressing<br />
                                <span className="text-yellow-400">simplement.</span>
                            </h2>
                            <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-xs">
                                Suivez vos commandes, vos clients et vos produits depuis une seule plateforme.
                            </p>
                        </motion.div>

                        {/* Stats decoratives */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-12 grid grid-cols-2 gap-4"
                        >
                            {[
                                { label: 'Commandes', value: '100+' },
                                { label: 'Clients', value: '50+' },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm">
                                    <p className="text-2xl font-bold text-yellow-400">{stat.value}</p>
                                    <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Bottom */}
                    <div className="relative z-10 px-10 pb-8">
                        <p className="text-xs text-neutral-600">© 2025 {name}. Tous droits réservés.</p>
                    </div>
                </div>

                {/* Right panel — form */}
                <div className="flex flex-1 flex-col bg-white">
                    {/* Mobile header */}
                    <div className="flex items-center gap-3 p-6 lg:hidden">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500">
                            <AppLogoIcon className="size-5 text-neutral-900" />
                        </div>
                        <span className="text-lg font-bold text-neutral-900 tracking-tight">{name}</span>
                    </div>

                    <div className="flex flex-1 flex-col justify-center px-8 py-10 sm:px-12 lg:px-14">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
                                {description && (
                                    <p className="mt-1.5 text-sm text-neutral-500">{description}</p>
                                )}
                            </div>

                            <div>{children}</div>
                        </motion.div>
                    </div>

                    <div className="px-8 pb-6 sm:px-12 lg:px-14">
                        <p className="text-xs text-neutral-400">
                            Besoin d'aide ?{' '}
                            <a href="#" className="text-yellow-600 hover:text-yellow-700 transition-colors">
                                Contactez le support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
