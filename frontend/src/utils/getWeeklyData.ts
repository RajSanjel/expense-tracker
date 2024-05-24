type DataProps = {
  id: number;
  income: number;
  expense: number;
  date: string;
}[];

export function getWeeklyData(data: DataProps) {
  return data.slice(0, 7);
}
