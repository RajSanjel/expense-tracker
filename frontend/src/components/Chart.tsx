import { LineChart } from "@mui/x-charts/LineChart";
import { dateSorterAscending, dateSorterDescending } from "@/utils/dateSorter";
import { getWeeklyData } from "@/utils/getWeeklyData";
import { useDb } from "@/context/DbContext";
import { useEffect } from "react";
import processAndGroupData from "@/utils/formatDbData";

const incomeData: number[] = [];
const expenseData: number[] = [];
const amountData: number[] = [];
const xLabels: string[] = [];

export function Chart() {
  const db = useDb();
  const data = db.incExpData;
  const sortedData = processAndGroupData(dateSorterAscending(
    getWeeklyData(dateSorterDescending(data))
  ));
  console.log(sortedData)
  useEffect(() => {
    sortedData.forEach((item) => {
      incomeData.push(item.income);
      expenseData.push(item.expense);
      amountData.push(item.income - item.expense);
      xLabels.push(item.date);
    });
  }, [sortedData])
  return (
    <>
      {data.length > 0 &&
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
      }
    </>
  );

}