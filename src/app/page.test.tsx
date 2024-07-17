import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Home component", () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<Home />);
    // Verify that the component renders without throwing any errors
  });

  test("displays nickname when logged in", () => {
    localStorage.getItem.mockReturnValueOnce("testUser");
    render(<Home />);
    expect(screen.getByText(/testUser님/i)).toBeInTheDocument();
  });

  test("logs out user when logout button is clicked", async () => {
    localStorage.getItem.mockReturnValueOnce("testUser");
    render(<Home />);
    const logoutButton = screen.getByText(/로그아웃/i);
    fireEvent.click(logoutButton);
    // Simulate asynchronous behavior
    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith("id");
      // You may need to adjust the timing or method of redirection validation
      // depending on how your application handles redirects
      expect(window.location.replace).toHaveBeenCalled();
    });
  });

  // You can add more tests as needed for other components and functionality
});
