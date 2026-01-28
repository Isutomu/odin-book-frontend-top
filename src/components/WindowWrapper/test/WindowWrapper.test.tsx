// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Local Modules
import { WindowWrapper } from "../WindowWrapper";

// Tests
// Dragging the window will be tested on E2E
describe("WindowWrapper renders properly", () => {
  const title = "Title";
  const Children = <strong>lol</strong>;
  const WrappedComponent = () => {
    return <WindowWrapper title={title}>{Children}</WindowWrapper>;
  };

  it("renders the component", () => {
    render(<WrappedComponent />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders the component with given title", () => {
    render(<WrappedComponent />);
    const titleElement = screen.getByRole("heading");
    expect(titleElement.textContent).toBe(title);
  });

  it("renders the component with given component", () => {
    render(<WrappedComponent />);
    const childrenElement = screen.getByRole("strong");
    expect(childrenElement).toBeInTheDocument();
  });
});
