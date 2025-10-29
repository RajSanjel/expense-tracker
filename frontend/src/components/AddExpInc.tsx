import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import axios from "axios";
import { z } from "zod";
import config from "@/config";
import { useDb } from "@/context/DbContext";

export function AddExpInc() {
  const db = useDb();

  const [title, setTitle] = useState("");
  const [incExp, setIncExp] = useState<string>("");
  const [date, setDate] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState<string>("");

  const submitSchema = z.object({
    title: z.string().min(1),
    expense: z.number(),
    income: z.number(),
    date: z.string().min(1),
  });

  const handleSubmit = () => {
    setError(""); // clear previous errors

    if (!title || !incExp || !date) {
      setError("All fields are required.");
      return;
    }

    const submitData = {
      title: title,
      expense: Number(incExp) < 0 ? Number(incExp) : 0,
      income: Number(incExp) > 0 ? Number(incExp) : 0,
      date: date,
    };

    const isValidDate = (inputDate: string) => {
      const currentDate = new Date();
      const input = new Date(inputDate);
      currentDate.setHours(0, 0, 0, 0);
      input.setHours(0, 0, 0, 0);
      return input.getTime() <= currentDate.getTime();
    };

    if (!isValidDate(submitData.date)) {
      setError("Future date is not allowed.");
      return;
    }

    const parsed = submitSchema.safeParse(submitData);
    if (!parsed.success) {
      setError("Invalid data. Please check your inputs.");
      return;
    }

    setIsSubmiting(true);

    axios
      .post(
        `${config.API_BASE_URL}/api/post/incExp`,
        {
          date: submitData.date,
          expense: submitData.expense,
          income: submitData.income,
          title: submitData.title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setIncExp("");
        setTitle("");
        setDate("");
        db.reload();
      })
      .catch(() => {
        setError("Failed to submit data. Please try again.");
      })
      .finally(() => {
        setIsSubmiting(false);
      });
  };

  return (
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
          <span className="mb-2">Date</span>
          <Input
            type="date"
            id="date"
            className="mt-1"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </label>

        <Button
          className="font-lg font-semibold"
          onClick={handleSubmit}
          disabled={isSubmiting}
        >
          {isSubmiting ? "Adding..." : "Add"}
        </Button>

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </CardContent>
    </Card>
  );
}
