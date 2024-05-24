import { dateSorterDescending } from "@/utils/dateSorter";

type DataProps = {
  id: number;
  income: number;
  expense: number;
  date: string;
}[];

export function isTodayPresent(data: DataProps) {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() < 9 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
  const day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
  return dateSorterDescending(data)[0].date == `${year}-${month}-${day}`;
}
