import React from "react";

type AuthProps = {
  isAuth: boolean;
};

function withAuth<P extends object>(
  Component: React.ComponentType<P & AuthProps>
) {
  const AuthHOC = (props: P) => {
    const token = localStorage.getItem("token");
    const isAuth = !!token;
    return <Component {...props} isAuth={isAuth} />;
  };

  return AuthHOC;
}
export default withAuth;
