import { LineChart } from "@mui/x-charts/LineChart";
import data from "../api/data.json";
import { dateSorterAscending, dateSorterDescending } from "@/utils/dateSorter";
import { getWeeklyData } from "@/utils/getWeeklyData";

const sortedData = dateSorterAscending(
  getWeeklyData(dateSorterDescending(data))
);

const incomeData: number[] = [];
const expenseData: number[] = [];
const amountData: number[] = [];
const xLabels: string[] = [];

sortedData.forEach((item) => incomeData.push(item.income));
sortedData.forEach((item) => expenseData.push(item.expense));
sortedData.forEach((item) => amountData.push(item.income - item.expense));
sortedData.forEach((item) => xLabels.push(item.date));
export function Chart() {
  return (
    <>
      <div className="hidden bg-white rounded-md border-2 border-slate-200 shadow-md md:block content-center container p-6">
        <h1 className="font-bold text-xl"> Weekly Statistics</h1>
        <LineChart
          width={600}
          height={350}
          series={[
            { data: incomeData, label: "Income", color: "#16a34a" },
            { data: expenseData, label: "Expense", color: "#dc2626" },
            { data: amountData, label: "Net Amount", color: "#2e96ff" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
    </>
  );
}
