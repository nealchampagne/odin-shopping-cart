import { describe, expect, it, act } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import Cart from "../components/Cart";
import { CartContextProvider } from "../components/CartContext";
import { mockCart, mockResponse } from "./mocks";

let cartArray = mockCart;

// Mock the Link component to circumvent router complications in vitest
vi.mock("react-router-dom", () => ({
  Link: vi.fn().mockImplementation(() => <div>Link</div>),
}));

describe("Cart Component", () => {
  it(`Displays correct number of Cart Items and 
    correct subtotal`, async () => {
    // Mock the fetch response
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        }),
      ),
    );

    // Render only the Cart element wrapped in CartContext
    render(<CartContextProvider initialCart={cartArray} children={<Cart />} />);

    // Check that the shimmer cards are shown
    expect(screen.getByTestId("cartcards").children.length).toBe(4);

    // Check that the subtotal is correct after the fetch call resolves
    await waitFor(() =>
      expect(document.getElementById("subtotal").textContent).toMatch("$9.00"),
    );

    // Check for the correct number of cart items after fetch has resolved
    expect(screen.getByTestId("cartcards").children.length).toEqual(
      cartArray.length,
    );
  });

  it(`Displays correct error page on fetch error`, async () => {
    
    // Clear previous fetch mock
    vi.unstubAllGlobals();

    // Make fetch reject with an error
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(Error("Fetch error!"))),
    );

    render(<CartContextProvider initialCart={cartArray} children={<Cart />} />);

    // Check for correct error message
    await waitFor(() =>
      expect(screen.getByTestId("errormessage").textContent).toBe(
        "Error: Fetch error!",
      ),
    );

    // Clear DOM
    document.body.innerHTML = "";

    vi.unstubAllGlobals();

    // Make fetch come back with a "not ok" status, but not reject
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ json: {}, status: 500 })),
    );

    render(<CartContextProvider initialCart={cartArray} children={<Cart />} />);

    // Check for correct error message being displayed
    await waitFor(() =>
      expect(screen.getByTestId("errormessage").textContent).toBe(
        "Error: server error",
      ),
    );
  });

  it(`Checkout is disabled on empty cart`, async () => {

    vi.unstubAllGlobals();

    // Return to mocking a good fetch response
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        }),
      ),
    );

    // Give Cart component an empty cart array
    cartArray = [];

    render(<CartContextProvider initialCart={cartArray} children={<Cart />} />);

    expect(screen.getByTestId("cartcards").children.length).toBe(4);

    // Wait for fetch to resolve then check for the single "empty cart" card
    await waitFor(() =>
      expect(
        expect(screen.getByTestId("cartcards").children.length).toEqual(1),
      ),
    );

    // Check for disabled checkout button on empty cart
    expect(screen.getByTestId("checkout").className.includes("disabled")).toBe(
      true,
    );
  });
});
