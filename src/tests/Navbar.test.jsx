import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { CartContextProvider } from "../components/CartContext";
import { mockCart } from "./mocks";

vi.mock("react-router-dom", () => ({
  Link: vi.fn().mockImplementation(() => <div>Link</div>),
}));

let cartArray = mockCart;

describe("Navbar Component", () => {
  it("Displays correct number of items in cart", () => {
    render(
      <CartContextProvider initialCart={cartArray} children={<Navbar />} />,
    );

    expect(screen.getByTestId("cartcount").textContent).toBe("5");

    cartArray[0].count += 100;

    document.body.innerHTML = '';

    render(
      <CartContextProvider initialCart={cartArray} children={<Navbar />} />,
    );

    expect(screen.getByTestId("cartcount").textContent).toBe("99+");
  });
});
