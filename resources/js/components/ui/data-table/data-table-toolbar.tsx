import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { ReactNode, useState } from 'react';

export default function DataTableToolbar({
  filters,
  searchKey = 'search',
  placeholder,
  actions,
}: {
  filters?: Record<string, string>
  searchKey?: string
  actions?: ReactNode,
  placeholder?:string
}) {
  const [search, setSearch] = useState(filters?.[searchKey] || '');

  const handleSearch = (value: string) => {
    setSearch(value);

    router.get(window.location.pathname, {
      ...filters,
      [searchKey]: value
    }, {
      preserveState: true,
      replace: true
    });
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="text-sm "
        />
      </div>


    </div>
  );
}
