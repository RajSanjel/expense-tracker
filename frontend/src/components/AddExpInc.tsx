import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import axios from "axios";
import { z } from "zod";
import config from "@/config";

export function AddExpInc() {
  const [title, setTitle] = useState("");
  const [incExp, setIncExp] = useState<string>("");
  const [date, setDate] = useState("");
  const submitSchema = z.object({
    title: z.string().min(1),
    expense: z.number(),
    income: z.number(),
    date: z.string().min(1),
  });
  const handleSubmit = () => {
    if (incExp !== undefined) {
      const submitData = {
        title: title,
        expense: Number(incExp) < 0 ? Number(incExp) : 0,
        income: Number(incExp) > 0 ? Number(incExp) : 0,
        date: date,
      };

      if (submitSchema.safeParse(submitData).success) {
        try {
          axios.post(`${config.API_BASE_URL}/api/post/incExp`,
            {
              date: submitData.date,
              expense: submitData.expense,
              income: submitData.income,
              title: submitData.title,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }
          )
            .then(() => {
              setIncExp("");
              setTitle("");
              setDate("");
            })
            .catch(err => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      }
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
              onChange={(e) => setIncExp(e.target.value)}
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
