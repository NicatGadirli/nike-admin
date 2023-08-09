import { useContext } from "react";

import { Outlet, Navigate } from "react-router-dom";

import { Auth } from "../utils/Auth";

const ProtectedRouter = () => {
  const { token } = useContext(Auth);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouter;
