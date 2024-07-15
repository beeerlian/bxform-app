import { useContext } from "react";

import LoginContext, { TContext } from "contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const loginCtx = useContext<TContext>(LoginContext);

  return loginCtx.isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth/login"
      replace
      state={{ from: location }} // <-- current location so login can redirect back is desired
    />
  );
};

export default AuthLayout;