import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data from "../api/data.json";
import { dateSorterDescending } from "@/utils/dateSorter";
import { isTodayPresent } from "@/utils/isTodayPresent";

export function Display() {
  const itemToDisplay = dateSorterDescending(data);
  console.log(isTodayPresent(data));
  return (
    <>
      <div className="w-full bg-white p-8 border-slate-200 border-2 rounded-lg shadow-xl">
        <span className="font-bold text-lg m-4">Your expenses and incomes</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead>Income</TableHead>
              <TableHead>Expense</TableHead>
              <TableHead className="text-right">Net Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemToDisplay.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell>${item.income}</TableCell>
                <TableCell>${item.expense}</TableCell>
                <TableCell
                  className={`font-semibold text-right ${
                    item.income - item.expense > 0
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  $
                  {item.income - item.expense < 0
                    ? item.expense - item.income
                    : item.income - item.expense}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
