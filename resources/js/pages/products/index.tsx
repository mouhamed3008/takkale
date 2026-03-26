import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/data-table';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { BreadcrumbItem, PaginatedData, Product } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { columns } from './columns';
import ProductModal from './components/product-modal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Produits', href: products.index.url() }];

interface ProductIndexProps {
    products: PaginatedData<Product> & {
        current_page?: number;
        from?: number;
        per_page?: number;
        to?: number;
        total?: number;
    };
    filters?: Record<string, string>;
}

export default function Index({ products, filters }: ProductIndexProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des produits" />

            <div className="flex flex-1 flex-col">
                <div className="min-h-full p-5 md:p-7">
                    <div className="mx-auto w-full">
                        <DataTable
                            columns={columns}
                            data={products}
                            filters={filters}
                            searchKey="name"
                            title="Products List"
                            placeholder="Rechercher un produit"
                            subtitle="Gérez votre catalogue, surveillez vos produits et retrouvez rapidement les actions principales."
                            headerAction={
                                <>
                                    <Button className="rounded-2xl px-5 text-sm font-medium" onClick={() => setIsModalOpen(true)}>
                                        <Plus className="h-4 w-4" />
                                        Add Product
                                    </Button>
                                </>
                            }
                        />
                    </div>
                </div>
            </div>

            <ProductModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </AppLayout>
    );
}
