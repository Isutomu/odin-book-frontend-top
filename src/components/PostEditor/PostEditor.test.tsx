// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Local Modules
import { PostEditor } from "./PostEditor";

// Constants
const Stub = createRoutesStub([
  {
    path: "/test",
    Component: PostEditor,
  },
]);

// Tests
describe("PostEditor normal behavior", () => {
  const WrappedComponent = () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Stub initialEntries={["/test"]} />
      </QueryClientProvider>
    );
  };

  it("renders the text area", () => {
    render(<WrappedComponent />);

    const inputElement = screen.getByPlaceholderText("Your post goes here!");
    expect(inputElement).toBeInTheDocument();
  });
});
