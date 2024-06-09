type DataProps = {
  income: number;
  expense: number;
  date: string;
}[];

// Function to get the last 7 days in 'YYYY-MM-DD' format
function getLast7Days(): string[] {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates.reverse();
}

export default function getWeeklyData(data: DataProps) {
  const last7Days = getLast7Days();

  const dataMap: { [key: string]: { income: number; expense: number } } = {};

  data.forEach((item) => {
    if (dataMap[item.date]) {
      dataMap[item.date].income += item.income;
      dataMap[item.date].expense += item.expense;
    } else {
      dataMap[item.date] = { income: item.income, expense: item.expense };
    }
  });

  const weeklyData = last7Days.map(date => ({
    date,
    income: dataMap[date]?.income || 0,
    expense: dataMap[date]?.expense || 0,
  }));

  return weeklyData;
}
