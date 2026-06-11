import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell, LogOut, Search, UserRound } from 'lucide-react';

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

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2.5 rounded-lg p-1 transition-colors hover:bg-accent">
                            <Avatar className="size-8 rounded-full">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="rounded-full text-xs">{getInitials(auth.user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="hidden flex-col text-left sm:flex">
                                <span className="text-foreground text-sm leading-none font-semibold">{auth.user.name}</span>
                                <span className="text-muted-foreground mt-0.5 text-xs leading-none">{auth.user.email}</span>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-2 py-2">
                                <Avatar className="size-8 rounded-full">
                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                    <AvatarFallback className="rounded-full text-xs">{getInitials(auth.user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">{auth.user.name}</span>
                                    <span className="text-muted-foreground text-xs">{auth.user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('profile.edit')} className="flex cursor-pointer items-center gap-2">
                                <UserRound className="size-4" />
                                Voir le profil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link method="post" href={route('logout')} as="button" className="flex w-full cursor-pointer items-center gap-2 text-red-600 focus:text-red-600">
                                <LogOut className="size-4" />
                                Se déconnecter
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
