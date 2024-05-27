import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
export function Login() {
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Invalid Email" })
      .email("Invalid Email"),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const loginUser = {
    email,
    password,
  };

  const handleLogin = async () => {
    const validated = loginSchema.safeParse(loginUser);
    if (validated.success) {
      setErrors({
        email: "",
        password: "",
      });
      await axios
        .post("http://localhost:5000/api/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.statusText == "OK") {
            localStorage.setItem("token",res.data.token)
            console.log(res);
          }
          setEmail("");
          setPassword("");
          setLoginError(false);
        })
        .catch((err) => {
          setLoginError(true);
          setLoginErrorMsg(err.response.data.msg);
          console.log(err);
        });
    } else {
      const formatted = validated.error.format();
      setErrors({
        email: formatted.email?._errors[0] || "",
        password: formatted.password?._errors[0] || "",
      });
    }
  };
  const inputFields = [
    {
      id: "email",
      title: "Email",
      type: "text",
      placeholder: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      error: errors.email,
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      error: errors.password,
    },
  ];

  return (
    <div>
      {loginError && (
        <Alert variant="destructive" className="bg-white shadow-sm mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{loginErrorMsg}</AlertDescription>
        </Alert>
      )}
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {inputFields.map((item) => (
            <label htmlFor={item.id} key={item.id}>
              <p className="mb-3">
                {item.title}{" "}
                <span className="text-xs text-red-600">{item.error}</span>
              </p>
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
    </div>
  );
}
