import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/data-table';
import AppLayout from '@/layouts/app-layout';
import orders from '@/routes/orders';
import { BreadcrumbItem, Order, PaginatedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import pos from '@/routes/pos';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Commandes', href: orders.index.url() }];

interface OrderIndexProps {
    orders: PaginatedData<Order> & {
        current_page?: number;
        from?: number;
        per_page?: number;
        to?: number;
        total?: number;
    };
    filters?: Record<string, string>;
}

export default function Index({ orders, filters }: OrderIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des commandes" />

            <div className="flex flex-1 flex-col">
                <div className="min-h-full p-5 md:p-7">
                    <div className="mx-auto w-full">
                        <DataTable
                            columns={columns}
                            data={orders}
                            filters={filters}
                            searchKey="code"
                            title="Commandes"
                            placeholder="Rechercher une commande"
                            subtitle="Liste des commandes réalisées pour votre entreprise"
                            headerAction={
                                <Button onClick={() => router.get(pos.index.url())} className="rounded-2xl px-5 text-sm font-medium">
                                    <Plus className="h-4 w-4" />
                                    Nouvelle commande
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
