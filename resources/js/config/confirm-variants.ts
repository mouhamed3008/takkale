// config/confirm-variants.ts

import { AlertTriangle, CheckCircle, HelpCircle, Info, ShieldAlert } from 'lucide-react';

export type ConfirmVariant = 'default' | 'destructive' | 'warning' | 'success' | 'info' | 'secure';

export interface ConfirmVariantConfig {
    icon: React.ElementType;
    iconContainerClass: string;
    iconClass: string;
    actionClass: string;
    cancelClass?: string;
    descriptionClass?: string;
}

export const confirmVariants: Record<ConfirmVariant, ConfirmVariantConfig> = {
    default: {
        icon: HelpCircle,
        iconContainerClass: 'bg-muted/50',
        iconClass: 'text-foreground',
        actionClass: 'bg-primary text-primary-foreground hover:bg-primary/90',
        cancelClass: 'hover:bg-muted/80',
    },

    destructive: {
        icon: AlertTriangle,
        iconContainerClass: 'bg-destructive/10',
        iconClass: 'text-destructive',
        actionClass: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        cancelClass: 'hover:bg-muted/80',
        descriptionClass: 'text-destructive/80',
    },

    warning: {
        icon: AlertTriangle,
        iconContainerClass: 'bg-amber-500/10',
        iconClass: 'text-amber-500',
        actionClass: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500/50',
        cancelClass: 'hover:bg-muted/80',
    },

    success: {
        icon: CheckCircle,
        iconContainerClass: 'bg-green-500/10',
        iconClass: 'text-green-500',
        actionClass: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500/50',
        cancelClass: 'hover:bg-muted/80',
    },

    info: {
        icon: Info,
        iconContainerClass: 'bg-blue-500/10',
        iconClass: 'text-blue-500',
        actionClass: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500/50',
        cancelClass: 'hover:bg-muted/80',
    },

    secure: {
        icon: ShieldAlert,
        iconContainerClass: 'bg-violet-500/10',
        iconClass: 'text-violet-500',
        actionClass: 'bg-violet-500 text-white hover:bg-violet-600 focus:ring-violet-500/50',
        cancelClass: 'hover:bg-muted/80',
        descriptionClass: 'text-muted-foreground/90',
    },
};

/**
 * Utilitaire pour récupérer une variante avec fallback sur 'default'
 */
export function getConfirmVariant(variant?: ConfirmVariant): ConfirmVariantConfig {
    return confirmVariants[variant || 'default'];
}

/**
 * Types pour le hook useConfirm
 */
export interface ConfirmOptions {
    title: string;
    description?: string;
    onConfirm: () => Promise<void> | void;
    variant?: ConfirmVariant;
    cancelText?: string;
    confirmText?: string;
}
