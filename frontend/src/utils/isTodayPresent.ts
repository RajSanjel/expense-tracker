import { dateSorterDescending } from "@/utils/dateSorter";

type DataProps = {
  income: number;
  expense: number;
  date: string;
}[];

export function isTodayPresent(data: DataProps) {
  if (data.length > 0) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    return dateSorterDescending(data)[0].date === today;
  } else {
    return []
  }

}

