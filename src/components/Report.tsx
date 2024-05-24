import "./css/total.css";
import data from "../api/data.json";
import {
  calculateTotalExpense,
  calculateTotalIncome,
} from "@/utils/calculateTotal";
import { getWeeklyData } from "@/utils/getWeeklyData";
import { dateSorterDescending } from "@/utils/dateSorter";
import { isTodayPresent } from "@/utils/isTodayPresent";

export function Report() {
  const weeklyData = getWeeklyData(dateSorterDescending(data));
  return (
    <>
      <div className="bg-white container py-8 px-8 rounded-md border-slate-200 border-2 shadow-md w-64 md:w-96"> 
        <div className="grid gap-3">
          <div className="text-md">
            <h1 className="font-bold text-lg mb-2">Today's report</h1>
            <p className="display-data">
              Todays Income{" "}
              <span className=" text-green-600">
                {" "}
                $
                {isTodayPresent(data)
                  ? dateSorterDescending(data)[0].income
                  : "-"}
              </span>
            </p>
            <p className="display-data">
              Todays Expenses{" "}
              <span className="text-red-600 ">
                $
                {isTodayPresent(data)
                  ? dateSorterDescending(data)[0].expense
                  : "-"}
              </span>
            </p>
            <p className="display-data">
              Net{" "}
              <span
                className={`${
                  isTodayPresent(data) &&
                  dateSorterDescending(data)[0].income <
                    dateSorterDescending(data)[0].expense
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                $
                {isTodayPresent(data)
                  ? dateSorterDescending(data)[0].income -
                      dateSorterDescending(data)[0].expense <
                    0
                    ? dateSorterDescending(data)[0].expense -
                      dateSorterDescending(data)[0].income
                    : dateSorterDescending(data)[0].income -
                      dateSorterDescending(data)[0].expense
                  : "-"}
              </span>
            </p>
          </div>

          <hr />

          <div className="text-md ">
            <h1 className="font-bold text-lg mb-2">Weekly report</h1>
            <p className="display-data">
              Weekly Income{" "}
              <span className=" text-green-600">
                ${calculateTotalIncome(weeklyData)}
              </span>
            </p>
            <p className="display-data">
              Weekly Expenses{" "}
              <span className="text-red-600 ">
                ${calculateTotalExpense(weeklyData)}
              </span>
            </p>
            <p className="display-data">
              Net{" "}
              <span
                className={`${
                  calculateTotalIncome(weeklyData) >
                  calculateTotalExpense(weeklyData)
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                $
                {calculateTotalIncome(weeklyData) -
                  calculateTotalExpense(weeklyData) <
                0
                  ? calculateTotalExpense(weeklyData) -
                    calculateTotalIncome(weeklyData)
                  : calculateTotalIncome(weeklyData) -
                    calculateTotalExpense(weeklyData)}
              </span>
            </p>
          </div>
          <hr />
          <div className="text-md ">
            <h1 className="font-bold text-lg mb-2">All Time report</h1>
            <p className="display-data">
              Net Income{" "}
              <span className=" text-green-600">
                ${calculateTotalIncome(data)}
              </span>
            </p>
            <p className="display-data">
              Net Expenses{" "}
              <span className="text-red-600 ">
                ${calculateTotalExpense(data)}
              </span>
            </p>
            <p className="display-data">
              Net{" "}
              <span
                className={`${
                  calculateTotalIncome(data) > calculateTotalExpense(data)
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ${calculateTotalIncome(data) - calculateTotalExpense(data)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
