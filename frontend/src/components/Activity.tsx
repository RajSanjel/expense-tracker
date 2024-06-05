import { useDb } from "@/context/DbContext";
import { Button } from "./ui/button"

type InfoCardProps = {
    id: string,
    income: number,
    expense: number,
    title: string
}

export default function Activity() {
    const datas = useDb().incExpData
    return (
        <div className="container grid gap-4 grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 pb-10">
            {datas.map(data =>
                <InfoCard {...data} key={data.id} />
            )}
        </div>
    )
}

function InfoCard({ id, income, expense, title }: InfoCardProps) {
    function handleDelete(id: string) {
        console.log(id)
    }
    function handleEdit(id: string) {
        console.log(id)
    }
    return (
        <>
            <div className="bg-white shadow-md rounded-md p-6 grid">
                <span className="text-xl font-bolder">
                    Title: {title}
                </span>
                {expense > income ?
                    <p className="text-lg">
                        Expense: <span className="text-red-700">
                            ${expense}
                        </span>
                    </p> :
                    <p className="text-lg">
                        Income: <span className="text-green-700">
                            ${income}
                        </span>
                    </p>
                }
                <div className="grid gap-2 grid-flow-col m-4">
                    <Button variant={"outline"} onClick={() => handleEdit(id)}>Edit</Button>
                    <Button className="bg-red-600 hover:bg-red-400" onClick={() => handleDelete(id)}>Delete</Button>
                </div>
            </div>
        </>
    )
}