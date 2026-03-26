import { type ClassValue, clsx } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateRelative(date: string | Date | null): string {
    if (!date) return '-';
    try {
        const parsed = typeof date === 'string' ? new Date(date) : date;
        return formatDistanceToNow(parsed, { addSuffix: true, locale: fr });
    } catch {
        return '-';
    }
}

export function getCurrentDate(separator = '') {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
}

export const formatPrice = (value: number) => new Intl.NumberFormat('fr-FR').format(value);

export const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

export const formatCurrency = (value: string | number | null): string => {
    if (value === null || value === undefined) return '0 F CFA';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
    }).format(isNaN(num) ? 0 : num);
};
