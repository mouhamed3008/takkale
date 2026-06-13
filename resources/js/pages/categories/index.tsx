import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/data-table';
import AppLayout from '@/layouts/app-layout';
import categoriesRoutes from '@/routes/categories';
import { BreadcrumbItem, Category, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { createColumns } from './columns';
import CategoryModal from './components/category-modal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Catégories', href: categoriesRoutes.index.url() }];

interface CategoriesIndexProps {
    categories: PaginatedData<Category> & {
        current_page?: number;
        from?: number;
        per_page?: number;
        to?: number;
        total?: number;
    };
    filters?: Record<string, string>;
}

export default function Index({ categories, filters }: CategoriesIndexProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleOpenCreate = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const columns = useMemo(() => createColumns({ onEdit: handleEdit }), []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des catégories" />

            <div className="flex flex-1 flex-col">
                <div className="min-h-full p-5 md:p-7">
                    <div className="mx-auto w-full">
                        <DataTable
                            columns={columns}
                            data={categories}
                            filters={filters}
                            searchKey="name"
                            title="Catégories"
                            placeholder="Rechercher une catégorie"
                            subtitle="Gérez vos catégories de produits et organisez votre catalogue."
                            headerAction={
                                <Button className="rounded-2xl px-5 text-sm font-medium" onClick={handleOpenCreate}>
                                    <Plus className="h-4 w-4" />
                                    Ajouter une catégorie
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>

            <CategoryModal open={isModalOpen} onClose={handleCloseModal} category={editingCategory} />
        </AppLayout>
    );
}
