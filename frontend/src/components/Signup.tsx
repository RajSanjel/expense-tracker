import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";

export function Signup() {
  const signUpSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: "Email must be filled" })
        .email("Invalid email"),
      username: z
        .string()
        .min(3, { message: "Username should be atleast 3 characters" }),
      password: z
        .string()
        .min(8, { message: "Password must be atleast 8 character" }),

      cpassword: z.string().min(8, { message: "Please confirm your password" }),
      dispName: z.string().min(3, { message: "Name too short" }),
    })
    .refine((data) => data.password === data.cpassword, {
      message: "Password doesn't Match",
      path: ["cpassword"],
    });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dispName, setDispName] = useState("");

  const handleRegister = () => {
    const newUser = {
      email,
      username,
      password,
      confirmPassword,
      dispName,
    };
    console.log(newUser);
    console.log(signUpSchema.safeParse(newUser).success);
    if (signUpSchema.safeParse(newUser).success) {
      console.log("form is okay!");
    } else {
      console.log("Something is missing!");
      console.log(signUpSchema.parse(newUser))
    }
  };

  const inputFields = [
    {
      id: "name",
      title: "Name",
      type: "text",
      placeholder: "Your Name",
      value: dispName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDispName(e.target.value),
    },
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      id: "username",
      title: "Username",
      type: "text",
      placeholder: "Username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
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
    {
      id: "confirmPassword",
      title: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
    },
  ];
  return (
    <div className="pb-8 w-96">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {inputFields.map((item) => (
            <label htmlFor={item.id} key={item.id}>
              <p className="mb-1">{item.title}</p>
              <Input
                type={item.type}
                placeholder={item.placeholder}
                id={item.id}
                onChange={item.onChange}
                value={item.value}
              />
            </label>
          ))}
          <Button onClick={handleRegister}>Signup</Button>
        </CardContent>
      </Card>
    </div>
  );
}
