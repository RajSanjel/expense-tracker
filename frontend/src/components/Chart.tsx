import { LineChart } from "@mui/x-charts/LineChart";
import { dateSorterAscending, dateSorterDescending } from "@/utils/dateSorter";
import { getWeeklyData } from "@/utils/getWeeklyData";
import { useDb } from "@/context/DbContext";
import { useEffect, useState } from "react";
import processAndGroupData from "@/utils/formatDbData";

export function Chart() {
  const db = useDb();
  const data = db.incExpData;

  const [incomeData, setIncomeData] = useState<number[]>([]);
  const [expenseData, setExpenseData] = useState<number[]>([]);
  const [amountData, setAmountData] = useState<number[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedData = processAndGroupData(dateSorterAscending(
        getWeeklyData(dateSorterDescending(data))
      ));
      const income: number[] = [];
      const expense: number[] = [];
      const amount: number[] = [];
      const labels: string[] = [];

      sortedData.forEach((item) => {
        income.push(item.income);
        expense.push(item.expense);
        amount.push(item.income - item.expense);
        labels.push(item.date);
      });

      setIncomeData(income);
      setExpenseData(expense);
      setAmountData(amount);
      setXLabels(labels);
    }
  }, [data]);

  return (
    <>
      {data && data.length > 0 &&
        <div className="hidden bg-white rounded-md border-2 border-slate-200 shadow-md md:block content-center container p-6">
          <h1 className="font-bold text-xl">Weekly Statistics</h1>
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
