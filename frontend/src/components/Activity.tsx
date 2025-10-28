import { useDb } from "@/context/DbContext";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { z } from "zod";
import withAuth from "@/HOC/withAuth";

type InfoCardProps = {
    id: string;
    uid: string;
    income: number;
    expense: number;
    title: string;
    date: string;
    onUpdate: () => void;
};

function Activity() {
    const { incExpData } = useDb();

    return (
        <div className="container grid gap-4 grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 pb-10">
            {incExpData.map(data => (
                <InfoCard {...data} key={data.id} onUpdate={() => { }} />
            ))}
        </div>
    );
}

function InfoCard({ uid, id, income, expense, title, date, onUpdate }: InfoCardProps) {
    return (
        <div className="bg-white shadow-md rounded-md p-6 grid">
            <span className="text-xl font-bolder">
                Title: {title}
            </span>
            {expense > income ? (
                <p className="text-lg">
                    Expense: <span className="text-red-700">
                        ${expense}
                    </span>
                </p>
            ) : (
                <p className="text-lg">
                    Income: <span className="text-green-700">
                        ${income}
                    </span>
                </p>
            )}
            <div className="grid gap-2 grid-flow-col m-4">
                <Edit id={id} income={income} expense={expense} title={title} date={date} uid={uid} onUpdate={onUpdate} />
                <Delete id={id} uid={uid} onUpdate={onUpdate} />
            </div>
        </div>
    );
}

function Edit({ id, expense, income, title, date, uid, onUpdate }: InfoCardProps) {
    const submitSchema = z.object({
        uid: z.string(),
        id: z.string(),
        title: z.string().min(1),
        expense: z.number(),
        income: z.number(),
        date: z.string().min(1),
    });
    const [newTitle, setTitle] = useState(title);
    const [newExpense, setExpense] = useState(-expense);
    const [newIncome, setIncome] = useState(income);
    const [newDate, setDate] = useState(date);
    const db = useDb();

    const handleEdit = async () => {
        const submitData = {
            uid: uid,
            id: id,
            title: newTitle,
            expense: newExpense,
            income: newIncome,
            date: newDate,
        };
        if (!submitSchema.safeParse(submitData).success) {
            return alert("Something went wrong");
        }
        await db.editData(submitData);
        onUpdate(); // Notify parent component to update
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="w-full text-white bg-gray-900 hover:bg-gray-700 p-2 rounded-lg">
                    Edit
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogDescription>
                    <Card className="shadow-md content-center w-full">
                        <CardHeader>
                            <span className="text-xl font-bold align-center text-center">
                                Edit
                            </span>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <label htmlFor="title" className="text-lg">
                                <span className="mb-2">Title</span>
                                <Input
                                    type="text"
                                    id="title"
                                    className="mt-1"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={newTitle}
                                />
                            </label>
                            <label htmlFor="expInc">
                                <span>Expense/Income</span>
                                {income > expense ? (
                                    <Input
                                        type="number"
                                        id="expInc"
                                        className="mt-1"
                                        onChange={(e) => setIncome(Number(e.target.value))}
                                        value={newIncome}
                                    />
                                ) : (
                                    <Input
                                        type="number"
                                        id="expInc"
                                        className="mt-1"
                                        onChange={(e) => setExpense(Number(e.target.value))}
                                        value={newExpense}
                                    />
                                )}
                                <span className="text-xs text-red-600">
                                    Note: -ve for expense & +ve for income
                                </span>
                            </label>
                            <label htmlFor="date">
                                <span className="mb-2">Date</span>
                                <Input
                                    type="date"
                                    id="date"
                                    className="mt-1"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={newDate}
                                />
                            </label>
                        </CardContent>
                    </Card>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleEdit()}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function Delete({ id, uid, onUpdate }: { id: string; uid: string; onUpdate: () => void; }) {
    const db = useDb();

    const handleDelete = async () => {
        await db.deleteData(id, uid);
        onUpdate(); // Notify parent component to update
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-700 hover:bg-red-600 w-full text-white rounded-lg">
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure you want to delete?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your record
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-600" onClick={() => handleDelete()}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default withAuth(Activity);
