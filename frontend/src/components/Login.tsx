import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export function Login() {
  const inputFields = [
    {
      id: "email",
      title: "Email/Username",
      type: "text",
      placeholder: "Email/username",
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Password",
    },
  ];

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {inputFields.map((item) => (
          <label htmlFor={item.id} key={item.id}>
            <p className="mb-3">{item.title}</p>
            <Input
              type={item.type}
              placeholder={item.placeholder}
              id={item.id}
            />
          </label>
        ))}
        <Button>Login</Button>
      </CardContent>
    </Card>
  );
}
