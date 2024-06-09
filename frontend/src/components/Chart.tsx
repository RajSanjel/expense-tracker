import { LineChart } from "@mui/x-charts/LineChart";
import getWeeklyData from "@/utils/getWeeklyData";
import { useDb } from "@/context/DbContext";

export function Chart() {
  const db = useDb();
  const data = db.incExpData;
  const chartData = (getWeeklyData(data))
  const incomeData: number[] = []
  const expenseData: number[] = []
  const amountData: number[] = []
  const xLabels: string[] = []
  chartData.forEach((data) => {
    incomeData.push(data.income)
    expenseData.push(data.expense)
    xLabels.push(data.date)
    amountData.push(data.income - data.expense)
  }
  )
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