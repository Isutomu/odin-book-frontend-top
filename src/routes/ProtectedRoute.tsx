// 3rd Party Modules
import { Navigate, Outlet } from "react-router-dom";
import { createContext } from "react";

// Local Modules
import styles from "./ProtectedRoute.module.css";
import { useVerifySession } from "../api/endpoints";
import { Loading } from "../components/Loading/Loading";
import { Header } from "../components/Header/Header";
import { MainMenu } from "../containers/MainMenu/MainMenu";
import { SettingsMenu } from "../containers/SettingsMenu/SettingsMenu";

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
          <div className={styles.mainDiv}>
            <Header />
            <div className={styles.main}>
              <aside className={styles.aside}>
                <MainMenu />
                <SettingsMenu />
              </aside>
              <Outlet />
            </div>
          </div>
        ) : (
          <Navigate to={"/login"} />
        ))}
    </>
  );
};
