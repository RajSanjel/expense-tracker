import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserData {
  userid: string;
  username: string;
  email: string;
  displayName: string;
}

interface Injected {
  isAuth: boolean;
  userData: UserData | null;
  authReady: boolean;
}

interface Options {
  requireAuth?: boolean;
  showLoader?: boolean;
  Fallback?: React.ComponentType;
}

export default function withAuth<P extends Injected>(
  Component: React.ComponentType<P>,
  { requireAuth = false, showLoader = true, Fallback }: Options = {}
) {
  return function AuthHOC(props: Omit<P, keyof Injected>) {
    const [authReady, setAuthReady] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        setAuthReady(true);
        return;
      }

      (async () => {
        try {
          const res = await axios.get(`${config.API_BASE_URL}/api/get/user`, {
            headers: { Authorization: `${token}` },
          });
          setIsAuth(true);
          setUserData(res.data);
        } catch {
          localStorage.removeItem("token");
          setIsAuth(false);
        } finally {
          setAuthReady(true);
        }
      })();
    }, []);

    // not ready yet
    if (!authReady) {
      if (!showLoader)
        return (
          <Component
            {...(props as P)}
            isAuth={false}
            userData={null}
            authReady={false}
          />
        );

      if (requireAuth)
        return (
          <div className="flex items-center justify-center h-screen">
            Loading…
          </div>
        );
    }


    if (requireAuth && !isAuth) {
      return Fallback ? <Fallback /> : null;
    }

    return (
      <Component
        {...(props as P)}
        isAuth={isAuth}
        userData={userData}
        authReady={authReady}
      />
    );
  };
}
