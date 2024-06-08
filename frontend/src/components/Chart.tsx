import { LineChart } from "@mui/x-charts/LineChart";
import { dateSorterAscending, dateSorterDescending } from "@/utils/dateSorter";
import { getWeeklyData } from "@/utils/getWeeklyData";
import { useDb } from "@/context/DbContext";
import { useEffect, useState } from "react";
import processAndGroupData from "@/utils/formatDbData";
import { getLast7Days } from "@/utils/getLast7Days";

export function Chart() {
  const db = useDb();
  const data = db.incExpData;

  const [incomeData, setIncomeData] = useState<number[]>([]);
  const [expenseData, setExpenseData] = useState<number[]>([]);
  const [amountData, setAmountData] = useState<number[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);

  useEffect(() => {
    const last7Days = getLast7Days();
    setXLabels(last7Days);

    const incomeMap: { [key: string]: number } = {};
    const expenseMap: { [key: string]: number } = {};

    if (data && data.length > 0) {
      const sortedData = processAndGroupData(dateSorterAscending(
        getWeeklyData(dateSorterDescending(data))
      ));

      sortedData.forEach((item) => {
        incomeMap[item.date] = item.income;
        expenseMap[item.date] = item.expense;
      });

      const income: number[] = last7Days.map(day => incomeMap[day] || 0);
      const expense: number[] = last7Days.map(day => expenseMap[day] || 0);
      const amount: number[] = last7Days.map(day => (incomeMap[day] || 0) - (expenseMap[day] || 0));

      setIncomeData(income);
      setExpenseData(expense);
      setAmountData(amount);
    } else {
      setIncomeData(Array(7).fill(0));
      setExpenseData(Array(7).fill(0));
      setAmountData(Array(7).fill(0));
    }
  }, [data]);

  return (
    <>
      {data && data.length > 0 &&
        <div className="hidden bg-white rounded-md border-2 border-slate-200 shadow-md md:block content-center container p-6">
          <h1 className="font-bold text-xl">Weekly Statistics</h1>
          <LineChart
            width={550}
            height={360}
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
