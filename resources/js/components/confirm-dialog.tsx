// components/confirm-dialog.tsx

import { getConfirmVariant } from '@/config/confirm-variants';
import { useConfirm } from '@/hooks/use-confirm';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';

export function ConfirmDialog() {
    const {
        open,
        title,
        description,
        onConfirm,
        close,
        loading,
        setLoading,
        variant = 'default',
        cancelText = 'Annuler',
        confirmText = 'Confirmer',
    } = useConfirm();

    const config = getConfirmVariant(variant);
    const Icon = config.icon;

    const handleConfirm = async () => {
        if (!onConfirm) return;
        try {
            setLoading(true);
            await onConfirm();
        } finally {
            setLoading(false);
            close();
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={close}>
            <AlertDialogContent
                className={cn('animate-in fade-in zoom-in-95 rounded-2xl border shadow-xl duration-200', 'max-w-[95vw] sm:max-w-md', 'bg-background')}
            >
                <AlertDialogHeader className="space-y-4 pb-2">
                    <div className="flex items-start gap-4">
                        {/* Icon Container */}
                        <div
                            className={cn(
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
                                config.iconContainerClass,
                                config.iconClass,
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </div>

                        {/* Text Content */}
                        <div className="min-w-0 flex-1 space-y-1">
                            <AlertDialogTitle className="text-lg leading-tight font-semibold break-words">{title}</AlertDialogTitle>
                            {description && (
                                <AlertDialogDescription
                                    className={cn('leading-relaxed break-words', config.descriptionClass ?? 'text-muted-foreground')}
                                >
                                    {description}
                                </AlertDialogDescription>
                            )}
                        </div>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex-col-reverse gap-3 pt-2 sm:flex-row">
                    <AlertDialogCancel disabled={loading} className={cn('w-full transition-all sm:w-auto', config.cancelClass)}>
                        {cancelText}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={loading}
                        className={cn(
                            'flex w-full min-w-[100px] items-center justify-center gap-2 transition-all focus:ring-2 focus:ring-offset-2 sm:w-auto',
                            config.actionClass,
                            loading && 'cursor-wait opacity-80',
                        )}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Chargement...</span>
                            </>
                        ) : (
                            confirmText
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
