import React from "react";
import { useLocalStorage } from "usehooks-ts";

export type TContext = {
  isLogin: boolean;
  toggleLogin: () => void;
};

const LoginContext = React.createContext<TContext>({
  isLogin: false,
  toggleLogin: () => {},
});

export const LoginContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [isLogin, setIsLogin] = useLocalStorage("isLogin", false);
  const [token, setToken] = useLocalStorage("token", null);

  function toggleLogin() {
    setIsLogin((prev) => !prev);
  }

  const loginValue: TContext = {
    isLogin: true,
    toggleLogin: toggleLogin,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
