import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import orders from '@/routes/orders';
import pos from '@/routes/pos';
import products from '@/routes/products';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BarChart2, CreditCard, LayoutGrid, Moon, Package, ShoppingBag, Star, Sun, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';
import customers from '@/routes/customers';

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Commandes',
        href: orders.index.url(),
        icon: ShoppingBag,
    },
    {
        title: 'Produits',
        href: products.index.url(),
        icon: Package,
    },
    {
        title: 'POS',
        href: pos.index.url(),
        icon: ShoppingBag,
    },
    {
        title: 'Clients',
        href: customers.index.url(),
        icon: Users,
    },
    {
        title: 'Paiements',
        href: '/paiements',
        icon: CreditCard,
    },
    {
        title: 'Finance',
        href: '/finance',
        icon: Wallet,
    },
    {
        title: 'Rapports',
        href: '/rapports',
        icon: BarChart2,
    },
    {
        title: 'Favoris',
        href: '/favoris',
        icon: Star,
    },
];

export function AppSidebar() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="mb-16">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="gap-0 p-3">
                <div className="flex items-center justify-center gap-1 rounded-lg p-1 group-data-[collapsible=icon]:flex-col">
                    <button
                        onClick={() => updateAppearance('light')}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2 ${
                            appearance === 'light'
                                ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
                        }`}
                    >
                        <Sun className="size-3.5" />
                        <span className="group-data-[collapsible=icon]:hidden">Clair</span>
                    </button>
                    <button
                        onClick={() => updateAppearance('dark')}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2 ${
                            appearance === 'dark'
                                ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
                        }`}
                    >
                        <Moon className="size-3.5" />
                        <span className="group-data-[collapsible=icon]:hidden">Sombre</span>
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
