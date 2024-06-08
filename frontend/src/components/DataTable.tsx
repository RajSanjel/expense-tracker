import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDb } from "@/context/DbContext";
import processAndGroupData from "@/utils/formatDbData";
import { useMemo } from "react";

type DataProps = {
  income: number;
  expense: number;
  date: string;
};

export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "income",
    header: () => <div className="text-right">Income</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("income"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "expense",
    header: () => <div className="text-right">Expense</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("expense"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "netAmount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      const expense: number = row.getValue("expense");
      const income: number = row.getValue("income");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Math.abs(income - expense));
      return (
        <div className={income > expense ? "text-green-600" : "text-red-600"}>
          {formatted}
        </div>
      );
    },
  },
];

export function DataTable() {
  const { incExpData } = useDb();
  const data = useMemo(() => processAndGroupData(incExpData), [incExpData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <>
      {data.length > 0 && (
        <div className="rounded-md border bg-white p-6 shadow-md grid grid-flow-row w-full lg:w-full md:w-4/5">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {table.getPageCount() > 1 && (
            <div className="space-x-2 px-4 grid grid-flow-col justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
