import { render, screen } from "@testing-library/react";
import LoginPage from "./page";
import { describe, it, expect, vi } from "vitest";

describe("LoginPage Component", () => {
  it("renders the LoginPage component", () => {
    render(<LoginPage />);
    const element = screen.getByText("LoginPage");
    expect(element).toBeInTheDocument();
  });
});
