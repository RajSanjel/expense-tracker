import axios from "axios";
import React, { useState, useEffect } from "react";

// Define the UserData interface
interface UserData {
  userid: string;
  username: string;
  email: string;
  displayName: string;
}

// Define the AuthProps interface
interface AuthProps {
  isAuth: boolean;
  userData: UserData;
}

// Define the withAuth higher-order component
function withAuth<P extends AuthProps>(Component: React.ComponentType<P>) {
  const AuthHOC = (props: Omit<P, keyof AuthProps>) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
      userid: "",
      username: "",
      email: "",
      displayName: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/get/user", {
              headers: {
                Authorization: token,
              },
            });
            setIsAuth(true);
            setUserData(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setIsAuth(false);
            localStorage.removeItem("token");
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      } else {
        setIsAuth(false);
        setIsLoading(false);
      }
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...(props as P)} isAuth={isAuth} userData={userData} />;
  };

  return AuthHOC;
}

export default withAuth;
