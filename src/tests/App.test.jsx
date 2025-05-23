import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import App from "../App";

// Mock the Link component for ease of testing
vi.mock("react-router-dom", () => ({
  Link: vi.fn().mockImplementation(() => <div>Link</div>),
}));

// Check that each page prop renders the correct page
describe("App component", () => {
  it("renders correct pages", async() => {
    render(<App page={"home"} />);

    expect(screen.getByTestId("home")).toBeTruthy

    render(<App page={"shop"} />);
    expect(screen.getByTestId("shop")).toBeTruthy;

    render(<App page={"cart"} />);
    expect(screen.getByTestId("cart")).toBeTruthy;
  });
});
