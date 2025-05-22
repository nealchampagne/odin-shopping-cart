import { describe, expect, it, act } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import Shop from "../components/Shop";
import { CartContextProvider } from "../components/CartContext";
import { mockCart, mockResponse } from "./mocks";

const cartArray = mockCart;

vi.mock("react-router-dom", () => ({
  Link: vi.fn().mockImplementation(() => <div>Link</div>),
}));

describe("Cart Component", () => {
  it(`Displays correct number of Shop Items`, async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        }),
      ),
    );

    render(<CartContextProvider initialCart={cartArray} children={<Shop />} />);

    expect(screen.getByTestId("shopcards").children.length).toBe(20);

    await waitFor(fetch);

    expect(screen.getByTestId("shopcards").children.length).toEqual(
      cartArray.length,
    );
  });

  it(`Displays correct error page on fetch error`, async () => {
    vi.unstubAllGlobals();

    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(Error("Fetch error!"))),
    );

    render(<CartContextProvider initialCart={cartArray} children={<Shop />} />);

    await waitFor(() =>
      expect(screen.getByTestId("errormessage").textContent).toBe(
        "Error: Fetch error!",
      ),
    );

    document.body.innerHTML = "";

    vi.unstubAllGlobals();

    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ json: {}, status: 500 })),
    );

    render(<CartContextProvider initialCart={cartArray} children={<Shop />} />);

    await waitFor(() =>
      expect(screen.getByTestId("errormessage").textContent).toBe(
        "Error: server error",
      ),
    );
  });
});
