import { useState } from "react";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import "./Boilerplate.css";
import { useQuery } from "@tanstack/react-query";

function Boilerplate() {
  const [count, setCount] = useState<number>(0);

  const initialQuery = useQuery({
    queryKey: ["postInitial"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      if (!response.ok) {
        throw new Error("Failed to do the initial fetch");
      }
      return response.json();
    },
  });
  const conditionalQuery = useQuery({
    queryKey: ["postConditional"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts/2").then((res) =>
        res.json()
      ),
    enabled: false,
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => conditionalQuery.refetch()}>download</button>
        {conditionalQuery.isPending ? null : (
          <p>{conditionalQuery.data.userId}</p>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {initialQuery.isPending ? (
        <p>Failed fetch!</p>
      ) : (
        <p>{initialQuery.data.userId}</p>
      )}
    </>
  );
}

export default Boilerplate;
