'use client'

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { ReactNode } from 'react'

import DataTableToolbar from './data-table-toolbar'
import DataTablePagination from './data-table-pagination'

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface DataTableResponse<TData> {
  data: TData[]
  links: PaginationLink[]
  from?: number
  to?: number
  current_page?: number
  per_page?: number
  total?: number
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: DataTableResponse<TData>
  filters?: Record<string, string>
  searchKey?: string
  headerAction?: ReactNode
  title?: string
  subtitle?: string
  toolbarAction?: ReactNode,
  placeholder?:string
}

export function DataTable<TData>({
  columns,
  data,
  filters,
  searchKey,
  headerAction,
  title,
  subtitle,
  toolbarAction,
  placeholder
}: DataTableProps<TData>) {
  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const from = data.from ?? ((data.current_page ?? 1) - 1) * (data.per_page ?? 10) + 1
  const to = data.to ?? Math.min(from + data.data.length - 1, data.total ?? data.data.length)
  const total = data.total ?? data.data.length

  return (
    <div className="space-y-6">
      {(title || headerAction) && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            {title && <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>}
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>

          {headerAction && (
            <div className="flex flex-wrap gap-3">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg bg-white p-6">
        <DataTableToolbar
          filters={filters}
          placeholder={placeholder}
          searchKey={searchKey}
          actions={toolbarAction}
        />

        <div className="mt-6 overflow-hidden ">
          <Table className="min-w-full">
            <TableHeader className="bg-slate-50/90">
              {table.getHeaderGroups().map(hg => (
                <TableRow key={hg.id} className="border-b border-slate-100 hover:bg-transparent">
                  {hg.headers.map(h => (
                    <TableHead key={h.id} className="h-14 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {flexRender(
                        h.column.columnDef.header,
                        h.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60">
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="px-5 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="font-medium text-slate-900">
              Result {from}-{to} of {total}
            </span>


          </div>

          <DataTablePagination data={data} />
        </div>
      </div>
    </div>
  )
}
