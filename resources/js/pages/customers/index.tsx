import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/data-table';
import AppLayout from '@/layouts/app-layout';
import customers from '@/routes/customers';
import { BreadcrumbItem, Customer, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { createColumns } from './columns';
import CustomerModal from './components/customer-modal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Clients', href: customers.index.url() }];

interface CustomersIndexProps {
    customers: PaginatedData<Customer> & {
        current_page?: number;
        from?: number;
        per_page?: number;
        to?: number;
        total?: number;
    };
    filters?: Record<string, string>;
}

export default function Index({ customers, filters }: CustomersIndexProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const handleOpenCreate = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCustomer(null);
    };

    const columns = useMemo(() => createColumns({ onEdit: handleEdit }), []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des clients" />

            <div className="flex flex-1 flex-col">
                <div className="min-h-full p-5 md:p-7">
                    <div className="mx-auto w-full">
                        <DataTable
                            columns={columns}
                            data={customers}
                            filters={filters}
                            searchKey="fullname"
                            title="Clients"
                            placeholder="Rechercher un client"
                            subtitle="Liste des clients de votre entreprise"
                            headerAction={
                                <Button onClick={handleOpenCreate} className="rounded-2xl px-5 text-sm font-medium">
                                    <Plus className="h-4 w-4" />
                                    Ajouter un client
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>

            <CustomerModal open={isModalOpen} onClose={handleCloseModal} customer={editingCustomer} />
        </AppLayout>
    );
}
