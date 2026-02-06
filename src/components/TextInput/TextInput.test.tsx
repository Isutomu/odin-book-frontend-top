// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Local Modules
import { TextInput } from "./TextInput";
import userEvent from "@testing-library/user-event";

// Tests
describe("TextInput normal responses", () => {
  const textInputProps = {
    label: "label",
    placeholder: "placeholder",
    value: "value",
    setValue: () => {},
    minLength: 0,
    maxLength: 999,
    regex: new RegExp(/^.*$/),
    regexError: "regexError",
    error: "error",
    setError: () => {},
    size: "100vw",
    equals: undefined,
    showError: true,
    withOcclusion: true,
  };

  it("renders the text input", () => {
    render(<TextInput {...textInputProps} />);

    const inputElement = screen.getByPlaceholderText(
      textInputProps.placeholder,
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the text input with the props", () => {
    render(<TextInput {...textInputProps} />);
    const inputElement = screen.getByPlaceholderText(
      textInputProps.placeholder,
    );

    // placeholder
    expect(inputElement).toBeInTheDocument();
    // label
    expect(screen.getByLabelText(textInputProps.label)).toBeInTheDocument();
    // value (controlled component with parent state)
    expect(inputElement.getAttribute("value")).toBe(textInputProps.value);
    // error (controlled component with parent state)
    expect(screen.getByText(textInputProps.error)).toBeInTheDocument();
    // withOcclusion
    expect(inputElement.getAttribute("type")).toBe("password");
    // size
    expect(screen.getAllByRole("generic")[1].getAttribute("style")).toContain(
      textInputProps.size,
    );
  });

  it("call setError when validating value", async () => {
    const fn = vi.fn();
    const newTextInputProps = {
      ...textInputProps,
      value: "va",
      minLength: 2,
      maxLength: 4,
      regex: new RegExp(/^.*l$/),
      regexError: "regexError",
      equals: "vall",
      setError: fn,
      withOcclusion: false,
    };
    render(<TextInput {...newTextInputProps} />);

    const user = userEvent.setup();
    const inputElement = screen.getByRole("textbox");

    // Empty value
    await user.clear(inputElement);
    expect(fn.mock.calls.at(-1)).toEqual(["Required"]);
    // Less characters than "minLength"
    inputElement.focus();
    await user.keyboard("[Backspace]");
    expect(fn.mock.calls.at(-1)).toEqual([
      `Minimum ${newTextInputProps.minLength} characters`,
    ]);
    // More characters than "maxLength"
    await user.paste("ue!");
    expect(fn.mock.calls.at(-1)).toEqual([
      `Maximum ${newTextInputProps.maxLength} characters`,
    ]);
    // Invalid format based on "regex"
    await user.paste("lu");
    expect(fn.mock.calls.at(-1)).toEqual([newTextInputProps.regexError]);
    // Different from "equals" value
    await user.paste("al");
    expect(fn.mock.calls.at(-1)).toEqual(["Values don't match"]);
    // No error
    await user.paste("ll");
    expect(fn.mock.calls.at(-1)).toEqual([null]);
  });

  it("changes input type to password when prop withOcclusion = true", () => {
    const newTextInputProps = { ...textInputProps, withOcclusion: true };
    render(<TextInput {...newTextInputProps} />);

    const inputElement = screen.getByPlaceholderText(
      textInputProps.placeholder,
    );
    expect(inputElement.getAttribute("type")).toBe("password");
  });

  it("hides error when prop showError = false", () => {
    const newTextInputProps = { ...textInputProps, showError: false };
    render(<TextInput {...newTextInputProps} />);

    const errorElement = screen.queryByText(textInputProps.error);
    expect(errorElement).toBeFalsy();
  });
});
