import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Terminal } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import withAuth from "@/HOC/withAuth";

function Signup({ isAuth }: { isAuth: boolean }) {
  if (isAuth) {
    return <Navigate to="/" />;
  }
  const signUpSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: "Please enter your email" })
        .email("Invalid email"),
      username: z
        .string()
        .min(3, { message: "Username should be atleast 3 characters" }),
      password: z
        .string()
        .min(8, { message: "Password must be atleast 8 character" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Please confirm your password" }),
      displayName: z.string().min(3, { message: "Name too short" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    });

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [regError, setRegError] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const handleRegister = async () => {
    const newUser = {
      email,
      username,
      password,
      confirmPassword,
      displayName,
    };
    const validated = signUpSchema.safeParse(newUser);
    setErrors(errors);
    if (validated.success) {
      setErrors({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        displayName: "",
      });
      await axios
        .post("http://localhost:5000/api/auth/register", {
          email,
          username,
          password,
          displayName,
        })
        .then((res) => {
          if (res.status == 201) {
            setRegError(false);
            setRegisterSuccess(true);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setdisplayName("");
            setUsername("");
          }
        })
        .catch((error) => {
          setRegError(true);
          setRegisterSuccess(false);
          setRegErrorMsg(error.response.data.msg);
        });
    } else {
      const formatted = validated.error.format();
      setErrors({
        email: formatted.email?._errors[0] || "",
        password: formatted.password?._errors[0] || "",
        confirmPassword: formatted.confirmPassword?._errors[0] || "",
        displayName: formatted.displayName?._errors[0] || "",
        username: formatted.username?._errors[0] || "",
      });
    }
  };
  const inputFields = [
    {
      id: "name",
      title: "Name",
      type: "text",
      placeholder: "Your Name",
      value: displayName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setdisplayName(e.target.value),
      error: errors.displayName,
    },
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      error: errors.email,
    },
    {
      id: "username",
      title: "Username",
      type: "text",
      placeholder: "Username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      error: errors.username,
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
    {
      id: "confirmPassword",
      title: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
      error: errors.confirmPassword,
    },
  ];
  return (
    <div className="pb-8 w-96">
      {registerSuccess && (
        <Alert className="bg-white shadow-sm mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Registration successful</AlertTitle>
          <AlertDescription>
            You may now proceed to{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </AlertDescription>
        </Alert>
      )}
      {regError && (
        <Alert variant="destructive" className="bg-white shadow-sm mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{regErrorMsg}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {inputFields.map((item) => (
            <label htmlFor={item.id} key={item.id}>
              <p className="mb-1">
                {item.title}
                <span className="text-xs text-red-600"> {item.error}</span>
              </p>
              <Input
                type={item.type}
                placeholder={item.placeholder}
                id={item.id}
                onChange={item.onChange}
                value={item.value}
              />
            </label>
          ))}
          <Button type="submit" onClick={handleRegister}>
            Signup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(Signup);
