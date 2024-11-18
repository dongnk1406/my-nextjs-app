import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Mock } from "vitest";
import Header from "@/components/Header";

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signOut: vi.fn()
}));

describe("Header component", () => {
  it("renders welcome message when user is logged in", () => {
    (useSession as Mock).mockReturnValue({
      data: { user: { name: "John Doe" } },
      status: "authenticated"
    });

    render(<Header />);
    expect(screen.getByText("Welcome John Doe!!!")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("renders correctly when user is not logged in", () => {
    (useSession as Mock).mockReturnValue({
      data: null,
      status: "unauthenticated"
    });

    render(<Header />);
    expect(screen.queryByText("Welcome")).not.toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("calls signOut when logout button is clicked", () => {
    (useSession as Mock).mockReturnValue({
      data: { user: { name: "John Doe" } },
      status: "authenticated"
    });

    render(<Header />);
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
  });
});
