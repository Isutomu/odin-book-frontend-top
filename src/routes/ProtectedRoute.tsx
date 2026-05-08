// 3rd Party Modules
import { Navigate, Outlet } from "react-router-dom";
import { createContext } from "react";
import { useVerifySession } from "../api/endpoints";
import { Loading } from "../components/Loading/Loading";

// Exportable Constants
export const UserContext = createContext(null);

// Exportable Component
export const ProtectedRoute = () => {
  const verifySession = useVerifySession({ fetch: { credentials: "include" } });

  return (
    <>
      <Loading loading={verifySession.isPending} />
      {!verifySession.isPending &&
        (verifySession.data?.status === 200 ? (
          <Outlet />
        ) : (
          <Navigate to={"/login"} />
        ))}
    </>
  );
};
