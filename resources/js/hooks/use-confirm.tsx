// hooks/use-confirm.tsx

import { ConfirmOptions } from '@/config/confirm-variants';
import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface ConfirmState extends ConfirmOptions {
    open: boolean;
    loading: boolean;
}

interface UseConfirmReturn extends ConfirmState {
    close: () => void;
    setLoading: (loading: boolean) => void;
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const initialState: ConfirmState = {
    open: false,
    title: '',
    description: '',
    variant: 'default',
    loading: false,
    onConfirm: async () => {},
};

const ConfirmContext = createContext<UseConfirmReturn | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<ConfirmState>(initialState);

    const close = useCallback(() => {
        setState((prev) => ({ ...prev, open: false }));
    }, []);

    const setLoading = useCallback((loading: boolean) => {
        setState((prev) => ({ ...prev, loading }));
    }, []);

    const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                ...initialState,
                ...options,
                open: true,
                onConfirm: async () => {
                    await options.onConfirm();
                    resolve(true);
                },
            });
        });
    }, []);

    const value: UseConfirmReturn = {
        ...state,
        close,
        setLoading,
        confirm,
    };

    return (
        <ConfirmContext.Provider value={value}>
            {children}
            <ConfirmDialog />
        </ConfirmContext.Provider>
    );
}

export function useConfirm(): UseConfirmReturn {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within a ConfirmProvider');
    }
    return context;
}
