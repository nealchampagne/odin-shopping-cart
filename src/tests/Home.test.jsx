import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("Home component", () => {
  it("renders correct page", async () => {

    render(<Home />);
    
    expect(screen.getByTestId('home')).toBeTruthy;

  });
});
