// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Local Modules
import { Loading } from "./Loading";

// Tests
describe("TextInput normal responses", () => {
  it("renders the full component", () => {
    render(<Loading loading={true} />);
    const spanElement = screen.getByText("Loading");
    expect(spanElement).toBeInTheDocument();
  });

  it("doesn't render loading element if loading is false", () => {
    render(<Loading loading={false} />);
    const spanElement = screen.queryByText("Loading");
    expect(spanElement).toBeNull();
  });
});
