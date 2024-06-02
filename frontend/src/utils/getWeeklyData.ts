type DataProps = {
  income: number;
  expense: number;
  date: string;
}[];

export function getWeeklyData(data: DataProps) {
  if (data.length > 0) {
    return data.slice(0, 7);
  } else {
    return [];
  }
}
