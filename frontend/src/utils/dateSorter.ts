type DataProps = {
  income: number;
  expense: number;
  date: string;
}[];

export function dateSorterAscending(data: DataProps): DataProps {
  const sorted = data.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime(); // For ascending order
  });
  return sorted;
}
export function dateSorterDescending(data: DataProps): DataProps {
  if (data.length > 0) {
    const sorted = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // For descending order
    });
    return sorted;
  } else { return [] }
}
