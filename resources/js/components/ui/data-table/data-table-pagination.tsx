import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { Button } from '../button';

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface DataTablePaginationProps {
  data: {
    links: PaginationLink[]
  }
}

export default function DataTablePagination({ data }: DataTablePaginationProps) {
  const links = data.links;

  const getButtonContent = (label: string) => {
  const clean = label.toLowerCase();

  if (clean.includes('previous')) {
    return (
      <>
        <ChevronLeft className="h-4 w-4" />
        <span>Prec.</span>
      </>
    );
  }

  if (clean.includes('next')) {
    return (
      <>
        <span>Suiv.</span>
        <ChevronRight className="h-4 w-4" />
      </>
    );
  }

  if (label === '...') {
    return <MoreHorizontal className="h-4 w-4" />;
  }

  return label;
};

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {links.map((link, i) => {
          const isPrev = link.label.includes('&laquo;') || link.label.toLowerCase().includes('previous');
          const isNext = link.label.includes('&raquo;') || link.label.toLowerCase().includes('next');
          const isEllipsis = link.label === '...';
          const isNumber = !isPrev && !isNext && !isEllipsis;

          return (
            <Button
              key={`${link.url ?? 'no-url'}-${i}`}
              variant="outline"
              disabled={!link.url || isEllipsis}
              className={`
                 px-4 text-sm font-medium transition-all
                ${isNumber ? 'min-w-11' : 'gap-2'}
                ${link.active ? 'bg-primary text-primary-foreground' : 'bg-white text-slate-600 hover:bg-slate-50'}
              `}
              onClick={() => link.url && router.visit(link.url)}
              aria-label={isPrev ? 'Precedent' : isNext ? 'Suivant' : `Page ${link.label}`}
              aria-current={link.active ? 'page' : undefined}
            >
              {getButtonContent(link.label)}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
