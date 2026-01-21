// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";

// Local Modules
import { Login } from "../Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Constants
const serverUrlInitialFetch = "https://jsonplaceholder.typicode.com/posts/1";
const serverUrlActiveFetch = "https://jsonplaceholder.typicode.com/posts/2";
const worker = setupWorker(
  http.get(serverUrlInitialFetch, () => {
    return HttpResponse.json({
      userId: "userIdInitial",
      id: 124,
      title: "lol",
      body: "lol\nlol\nlol\nlololol",
    });
  }),
  http.get(serverUrlActiveFetch, () => {
    return HttpResponse.json({
      userId: "userIdActive",
      id: 124,
      title: "lol",
      body: "lol\nlol\nlol\nlololol",
    });
  }),
);

// Hooks
beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());

// Tests
describe("Button", () => {
  const WrappedPage = () => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
  };

  it("renders the counter button", () => {
    render(<WrappedPage />);

    const buttonElement = screen.getAllByRole("button")[0];
    expect(buttonElement).toBeInTheDocument();
  });

  it("counter shows x upon click(s)", async () => {
    render(<WrappedPage />);

    const buttonElement = screen.getAllByRole("button")[0];
    const user = userEvent.setup();
    const numberClicks = Math.floor(Math.random() * 10);
    for (let i = 0; i < numberClicks; i++) {
      await user.click(buttonElement);
    }

    expect(buttonElement.textContent).toBe(`count is ${numberClicks}`);
  });

  it("verifies if the initial data is fetched", async () => {
    render(<WrappedPage />);

    await waitFor(() => {
      expect(screen.getByText("userIdInitial")).toBeInTheDocument();
    });
  });

  it("handles failed fetch", async () => {
    worker.use(
      http.get(serverUrlInitialFetch, () => {
        return HttpResponse.json(
          { message: "Registration failed" },
          { status: 404 },
        );
      }),
    );

    render(<WrappedPage />);
    await waitFor(() => {
      expect(screen.getByText("Failed fetch!")).toBeInTheDocument();
    });
  });

  it("verifies if data is fetched upon user request (button press)", async () => {
    render(<WrappedPage />);

    const buttonElement = screen.getAllByRole("button")[1];
    const user = userEvent.setup();
    await user.click(buttonElement);
    await waitFor(() => {
      expect(screen.getByText("userIdActive")).toBeInTheDocument();
    });
  });
});
