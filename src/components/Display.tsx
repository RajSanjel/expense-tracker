import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Display() {
  return (
    <>
      <div className="my-8 w-full h-96 bg-white p-8 border-slate-200 border-2 rounded-lg shadow-xl">
        <span className="font-bold text-lg m-4">Your expenses and incomes</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead>Expense</TableHead>
              <TableHead>Income</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">May 1</TableCell>
              <TableCell>100</TableCell>
              <TableCell>200</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">May 2</TableCell>
              <TableCell>101</TableCell>
              <TableCell>200</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
