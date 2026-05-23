// 3rd Party Modules
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Local Modules
import { Post } from "./Post";

// Tests
describe("Post normal behavior", () => {
  it("renders the post with the props ('null' updatedAt)", () => {
    vi.spyOn(Date, "now").mockImplementation(() =>
      Date.parse("2026-05-22T15:31:00.000Z"),
    );
    const postProps = {
      username: "username",
      content: "content",
      publishedAt: "2026-05-22T15:00:00.000Z",
      updatedAt: null,
    };
    render(<Post {...postProps} />);

    expect(screen.getByText(postProps.username)).toBeInTheDocument();
    expect(screen.getByText(postProps.content)).toBeInTheDocument();
    expect(screen.getByText("31min")).toBeInTheDocument();
  });

  it("renders the post with the props ('time' updatedAt)", () => {
    vi.spyOn(Date, "now").mockImplementation(() =>
      Date.parse("2026-05-22T15:31:00.000Z"),
    );
    const postProps = {
      username: "username",
      content: "content",
      publishedAt: "2026-05-22T15:00:00.000Z",
      updatedAt: "2026-05-22T15:10:00.000Z",
    };
    render(<Post {...postProps} />);

    expect(screen.getByText(postProps.username)).toBeInTheDocument();
    expect(screen.getByText(postProps.content)).toBeInTheDocument();
    expect(screen.getByText("21min")).toBeInTheDocument();
  });
});
