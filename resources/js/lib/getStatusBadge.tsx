import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

type Status = 'active' | 'inactive' | 'pending' | 'completed';

const baseClasses = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium';

const statusConfig: Record<
    Status,
    {
        label: string;
        className: string;
        icon?: React.ReactNode;
        dot?: string;
    }
> = {
    active: {
        label: 'Actif',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        dot: 'bg-blue-500',
    },
    inactive: {
        label: 'Inactif',
        className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        icon: <XCircle className="h-3 w-3" />,
    },
    pending: {
        label: 'En cours',
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        icon: <Clock className="h-3 w-3" />,
    },
    completed: {
        label: 'Livrée',
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        icon: <CheckCircle className="h-3 w-3" />,
    },
};

export const getStatusBadge = (status: boolean | Status) => {
    // 🔁 map boolean → status
    const normalizedStatus: Status = typeof status === 'boolean' ? (status ? 'active' : 'inactive') : status;

    const config = statusConfig[normalizedStatus];

    if (!config) return null;

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`${baseClasses} ${config.className}`}
        >
            {config.dot && <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />}
            {config.icon}
            {config.label}
        </motion.span>
    );
};
