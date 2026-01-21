// 3rd Party Modules
import { AnimatePresence } from "motion/react";
import React, { createContext, useState } from "react";
import { Navigate, useLocation, useOutlet } from "react-router-dom";

// Local Modules
import { Error } from "../components/Error/Error";

// Exportable Constants
type ErrorContextValue = {
  error: string | null;
  setError: (value: string) => void;
} | null;
export const ErrorContext = createContext<ErrorContextValue>(null);

// Exportable Component
export const App = () => {
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const outlet = useOutlet();

  const simplifiedLocation = location.pathname.split("/")[1];
  if (simplifiedLocation === "") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Error error={error} />
      <ErrorContext.Provider
        value={{
          error,
          setError: (value) => {
            setError(value);
            setTimeout(() => setError(null), 4000);
          },
        }}
      >
        <AnimatePresence mode="wait">
          {outlet && React.cloneElement(outlet, { key: simplifiedLocation })}
        </AnimatePresence>
      </ErrorContext.Provider>
    </>
  );
};
