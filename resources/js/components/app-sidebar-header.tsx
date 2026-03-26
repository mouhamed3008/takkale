import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-amber-100 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex flex-1 items-center gap-2">
                <div className="border-input bg-background text-foreground placeholder:text-muted-foreground flex h-9 flex-1 items-center gap-2 rounded-lg border px-3 text-sm">
                    <Search className="text-muted-foreground size-4 shrink-0" />
                    <input type="text" placeholder="Rechercher..." className="min-w-0 flex-1 bg-transparent outline-none" />
                    <kbd className="bg-muted text-muted-foreground hidden rounded px-1.5 py-0.5 text-xs font-medium sm:inline-flex">⌘K</kbd>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg p-2 transition-colors">
                    <Bell className="size-4" />
                </button>

                <div className="flex items-center gap-2.5">
                    <Avatar className="size-8 rounded-full">
                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                        <AvatarFallback className="rounded-full text-xs">{getInitials(auth.user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="hidden flex-col sm:flex">
                        <span className="text-foreground text-sm leading-none font-semibold">{auth.user.name}</span>
                        <span className="text-muted-foreground mt-0.5 text-xs leading-none">{auth.user.email}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
