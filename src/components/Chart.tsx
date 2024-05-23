import { LineChart } from "@mui/x-charts/LineChart";

const incomeData = [400, 300, 900, 278, 189, 230, 390];
const expenseData = [240, 198, 900, 398, 480, 380, 430];
const amountData = [160, 102, 0, -120, -291, -150, -40];
const xLabels = ["May 1", "May 2", "May 3", "May 4", "May 5", "May 6", "May 7"];

export function Chart() {
  return (
    <>
      <div className="bg-white rounded-md border-2 border-slate-200 shadow-lg">
        <LineChart
          width={600}
          height={300}
          series={[
            { data: incomeData, label: "Income" },
            { data: expenseData, label: "Expense" },
            { data: amountData, label: "Amount" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
    </>
  );
}
