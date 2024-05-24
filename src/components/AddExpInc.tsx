import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

export function AddExpInc() {
  return (
    <>
      <Card className="shadow-md content-center md:w-96 lg:w-96">
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
              onChange={(e) => console.log(e.target.value)}
            />
          </label>
          <label htmlFor="expInc">
            <span>Expense/Income</span>
            <Input
              type="number"
              id="expInc"
              className="mt-1"
              onChange={(e) => console.log(e.target.value)}
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
              onChange={(e) => console.log(e.target.value)}
            />
          </label>
          <Button className="font-lg font-semibold">Add</Button>
        </CardContent>
      </Card>
    </>
  );
}
