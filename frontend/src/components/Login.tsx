import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSchema = z.object({
    email: z.string().min(3) || z.string().email,
    password: z.string().min(8),
  });
  const loginUser = {
    email,
    password,
  };

  const handleLogin = () => {
    const validated = loginSchema.safeParse(loginUser);
    if (validated.success) {
      setEmail("");
      setPassword("");
    }
  };
  const inputFields = [
    {
      id: "email",
      title: "Email/Username",
      type: "text",
      placeholder: "Email/username",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
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
              value={item.value}
              onChange={item.onChange}
            />
          </label>
        ))}
        <Button type="submit" onClick={handleLogin}>
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
