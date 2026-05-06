// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoutesStub } from "react-router-dom";

// Local Modules
import { Signup } from "./Signup";

// Constants
const Stub = createRoutesStub([
  {
    path: "/signup",
    Component: Signup,
  },
]);

// Tests
describe("Sign up", () => {
  const WrappedPage = () => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Stub initialEntries={["/signup"]} />
      </QueryClientProvider>
    );
  };

  it("renders wrappers elements", () => {
    render(<WrappedPage />);

    const mainElement = screen.getAllByRole("main")[0];
    expect(mainElement).toBeInTheDocument();
    const formElement = screen.getAllByLabelText("Sign up user")[0];
    expect(formElement).toBeInTheDocument();
  });
});
