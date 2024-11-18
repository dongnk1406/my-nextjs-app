import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import LoginPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn()
}));

vi.mock("notistack", () => ({
  useSnackbar: vi.fn()
}));

describe("LoginPage", () => {
  const mockPush = vi.fn();
  const mockEnqueueSnackbar = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (useSnackbar as Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 6 characters long")
      ).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Invalid email address")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Password must be at least 6 characters long")
      ).not.toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled(); // Update with actual navigation logic if any
    });
  });
});
