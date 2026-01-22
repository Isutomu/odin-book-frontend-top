// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Local Modules
import { Button } from "../Button";

// Tests
describe("Button normal responses", () => {
  it("renders the button", () => {
    const name = "button";
    render(<Button onClick={() => {}} name={name} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders the button with given name", () => {
    const name = "button";
    render(<Button onClick={() => {}} name={name} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement.textContent).toBe(name);
  });

  it("renders the button with given component", () => {
    const Children = <strong></strong>;
    render(<Button onClick={() => {}} children={Children} />);

    const buttonElement = screen.getByRole("button");
    const childrenElement = within(buttonElement).getByRole("strong");
    expect(childrenElement).toBeInTheDocument();
  });

  it("button press executes 'onClick'", async () => {
    const onClick = vi.fn();
    render(<Button onClick={() => onClick("clicked")} name="button" />);

    const buttonElement = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(buttonElement);
    expect(onClick.mock.calls[0][0]).toBe("clicked");
  });
});

describe("Button expected errors", () => {
  it("does not render the button if name and children are given", () => {
    const name = "button";
    const Children = <strong></strong>;
    expect(() =>
      render(<Button onClick={() => {}} name={name} children={Children} />),
    ).toThrowError(Error);
  });

  it("does not render the button if name and children are not given", () => {
    expect(() => render(<Button onClick={() => {}} />)).toThrowError(Error);
  });
});
