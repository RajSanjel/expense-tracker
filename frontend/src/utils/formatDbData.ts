type DataItem = {
    date: string;
    income: number;
    expense: number;
};

export default function processAndGroupData(datas: DataItem[]): DataItem[] {
    if (datas.length > 0) {
        const groupedData = datas.reduce((acc: { [key: string]: DataItem }, data: DataItem) => {
            const date = data.date;
            if (!acc[date]) {
                acc[date] = { date: date, income: 0, expense: 0 };
            }
            acc[date].income += data.income;
            acc[date].expense += data.expense;
            return acc;
        }, {} as { [key: string]: DataItem });
        return Object.values(groupedData);
    } else {
        return [];
    }
}
''