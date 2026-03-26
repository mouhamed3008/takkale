import { Product } from '@/types';

export interface CustomerOption {
    value: string;
    label: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface PaymentOption {
    value: string;
    label: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image_url: string;
    qty: number;
}
