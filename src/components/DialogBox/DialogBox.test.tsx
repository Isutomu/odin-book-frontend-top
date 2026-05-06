// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Local Modules
import { DialogBox } from "./DialogBox";

// Tests
// E2E: Dragging the window
describe("DialogBox renders properly", () => {
  const title = "Title";
  const Children = <strong>lol</strong>;
  const WrappedComponent = () => {
    return <DialogBox title={title}>{Children}</DialogBox>;
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
