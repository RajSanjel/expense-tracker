import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import axios from "axios";
import { z } from "zod";
export function AddExpInc() {
  const [title, setTitle] = useState("");
  const [incExp, setIncExp] = useState<number>(0);
  const [date, setDate] = useState("");
  const submitSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    expense: z.number(),
    income: z.number(),
    date: z.string().min(1),
  });
  const handleSubmit = () => {
    const submitData = {
      id: 10,
      title: title,
      expense: incExp < 0 ? incExp : 0,
      income: incExp > 0 ? incExp : 0,
      date: date,
    };
    if (submitSchema.safeParse(submitData).success) {
      axios.post("../api/dbData.json", submitData);
    }
  };
  return (
    <>
      <Card className="shadow-md content-center w-80 md:w-96 lg:w-96">
        <CardHeader>
          <p className="text-xl font-bold align-center text-center">
            Add Expense or Income
          </p>
        </CardHeader>
        <CardContent className="grid gap-3">
          <label htmlFor="title" className="text-lg">
            <span className="mb-2">Title</span>
            <Input
              type="text"
              id="title"
              className="mt-1"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label htmlFor="expInc">
            <span>Expense/Income</span>
            <Input
              type="number"
              id="expInc"
              className="mt-1"
              onChange={(e) => setIncExp(Number(e.target.value))}
              value={incExp}
            />

            <span className="text-xs text-red-600">
              Note: -ve for expense & +ve for income
            </span>
          </label>
          <label htmlFor="date">
            <span className="mb-2">Expense/Income</span>
            <Input
              type="date"
              id="date"
              className="mt-1"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </label>
          <Button className="font-lg font-semibold" onClick={handleSubmit}>
            Add
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
