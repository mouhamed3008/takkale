import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role: Role;
    created_at: string;
    updated_at: string;
    active: boolean;
    company: Company;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
}

export interface Company {
    id: number;
    name: string;
    [key: string]: unknown;
}

export interface OrderProductPivot {
    quantity: number;
    unit_price: number;
    is_recovered: boolean;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id?: number;
    category?: Category;
    created_at: string;
    updated_at: string;
    image?: string;
    image_url?: string;
    user: User;
    active: boolean;
    pivot?: OrderProductPivot;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Customer {
    id: number;
    fullname: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    total: number;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Order {
    id: number;
    customer: Customer;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: string;
    created_at: string;
    updated_at: string;
    code: string;
    delivery_at: string;
    amount_received: number;
    amount: string;
    payment_method: PaymentMethods;
    payment_status: boolean;
    products: Product[];
    company: Company;

    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    is_shop: boolean;
    image?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface PaymentMethods {
    id: number;
    name: string;
}

export type OrderStatus = 'new' | 'processing' | 'completed' | 'cancelled';
