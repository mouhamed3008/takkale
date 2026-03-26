import { Head, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import pos from '@/routes/pos';
import { BreadcrumbItem, Customer, PaginatedData, PaymentMethods, Product } from '@/types';

import { getCurrentDate } from '@/lib/utils';
import Cart, { CartItem, CustomerOption } from './components/cart';
import ProductGrid from './components/product-grid';

interface POSProps {
    products: PaginatedData<Product>;
    customers: Customer[];
    cart: CartItem[];
    paymentMethods: PaymentMethods[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Produits', href: pos.index.url() }];

export default function Index() {
    const { products: initialProducts, customers, cart, paymentMethods } = usePage<POSProps>().props;

    const customerOptions: CustomerOption[] = customers.map((item) => ({
        value: String(item.id),
        label: item.fullname,
        phone: item.phone,
        email: item.email,
        address: item.address,
    }));

    const [search, setSearch] = useState('');
    const [customer, setCustomer] = useState('');
    const [allProducts, setAllProducts] = useState<Product[]>(initialProducts.data || []);
    const [currentPage, setCurrentPage] = useState((initialProducts.current_page as number) || 1);
    const [hasMore, setHasMore] = useState(
        ((initialProducts.current_page as number) || 1) * ((initialProducts.per_page as number) || 10) < ((initialProducts.total as number) || 0),
    );
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const date = getCurrentDate('/');

    const handleSearch = useCallback((term: string) => {
        setSearch(term);
        setAllProducts([]);
        setCurrentPage(1);
        setHasMore(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setIsLoading(true);
            router.get(
                pos.index.url(),
                {
                    name: term,
                    page: 1,
                },
                {
                    preserveState: true,
                    preserveScroll: false,
                    only: ['products'],
                    onSuccess: (page) => {
                        const props = page.props as unknown as POSProps;
                        setAllProducts(props.products.data || []);
                        setCurrentPage((props.products.current_page as number) || 1);
                        setHasMore(
                            ((props.products.current_page as number) || 1) * ((props.products.per_page as number) || 10) <
                                ((props.products.total as number) || 0),
                        );
                        setIsLoading(false);
                    },
                    onError: () => {
                        setIsLoading(false);
                    },
                },
            );
        }, 300);
    }, []);

    const loadMore = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        const nextPage = (currentPage as number) + 1;

        router.get(
            pos.index.url(),
            {
                name: search,
                page: nextPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
                onSuccess: (page) => {
                    const props = page.props as unknown as POSProps;
                    setAllProducts((prev) => [...prev, ...(props.products.data || [])]);
                    setCurrentPage((props.products.current_page as number) || nextPage);
                    setHasMore(
                        ((props.products.current_page as number) || nextPage) * ((props.products.per_page as number) || 10) <
                            ((props.products.total as number) || 0),
                    );
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
            },
        );
    }, [currentPage, search, isLoading, hasMore]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const target = observerTarget.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 0.1 },
        );

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [loadMore, hasMore, isLoading]);

    const visibleProducts: PaginatedData<Product> = {
        ...initialProducts,
        data: allProducts,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Transaction" />

            <div className="mx-auto flex h-[calc(100vh-8rem)] w-full max-w-[1700px] flex-col overflow-hidden xl:flex-row">
                <div className="flex min-h-0 min-w-0 flex-1 flex-col border-b border-slate-200/80 p-5 md:p-7 xl:border-r xl:border-b-0 xl:p-8">
                    <div className="flex flex-col gap-5 border-b border-slate-200/80 pb-6 xl:flex-row xl:items-start xl:justify-between">
                        <div>
                            <p className="text-2xl font-semibold tracking-tight text-slate-950">Sales Transaction</p>
                            <p className="mt-2 text-sm text-slate-500">{date}</p>
                        </div>

                        <div className="relative w-full max-w-md">
                            <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <Input
                                value={search}
                                onChange={(event) => handleSearch(event.target.value)}
                                placeholder="Search..."
                                className="bg-white pl-12 text-sm"
                            />
                        </div>
                    </div>

                    <ProductGrid categories={[]} activeCategory="all" onCategoryChange={() => undefined} products={visibleProducts} />
                    <div ref={observerTarget} className="flex justify-center py-4">
                        {isLoading && (
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
                                <span className="text-sm text-slate-600">Chargement des produits...</span>
                            </div>
                        )}
                        {!hasMore && allProducts.length > 0 && <p className="text-sm text-slate-500">Tous les produits ont été chargés</p>}
                    </div>
                </div>

                <Cart
                    items={cart}
                    customer={customer}
                    onCustomerChange={setCustomer}
                    customers={customerOptions}
                    paymentMethod={paymentMethods}
                    // onPaymentMethodChange={setPaymentMethod}
                    paymentMethods={paymentMethods}
                />
            </div>
        </AppLayout>
    );
}
