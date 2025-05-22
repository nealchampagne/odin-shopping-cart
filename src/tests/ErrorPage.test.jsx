import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../components/ErrorPage";

vi.mock("react-router-dom", () => ({
  Link: vi.fn().mockImplementation(() => <div>Link</div>),
}));

describe("App component", () => {
  it("Renders correct message when error is provided", () => {
    render(<ErrorPage error={"Oopsie poopsie!"} />);

    expect(screen.getByTestId("errormessage").textContent).toBe(
      "Oopsie poopsie!",
    );
  });

  it("Displays nonexistent link message when no error provided", () => {
    render(<ErrorPage />);

    expect(screen.getByTestId("errormessage").textContent).toBe(
      `This route doesn't exist!`,
    );
  });
});
