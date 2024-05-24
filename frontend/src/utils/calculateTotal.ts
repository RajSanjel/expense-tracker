type DataProps = {
  id: number;
  income: number;
  expense: number;
  date: string;
}[];

export function calculateTotalExpense(data: DataProps) {
  return data.reduce((total, item) => (total += item.expense), 0);
}

export function calculateTotalIncome(data: DataProps) {
  return data.reduce((total, item) => (total += item.income), 0);
}
