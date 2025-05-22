import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "../components/CartItem";
import { CartContextProvider } from "../components/CartContext";
import { mockCart, mockResponse } from "./mocks";

// Mock the cart array
let cartArray = mockCart;

// Mock the props passed to the CartItem component
const mockProps = {
  id: mockResponse[0].id,
  title: mockResponse[0].title,
  totalCost: cartArray[0].cost,
  image: mockResponse[0].image,
  price: mockResponse[0].price,
  quantity: cartArray[0].count,
};

describe("CartItem Component", () => {
  it(`Displays correct values passed by props`, () => {
    render(
      <CartContextProvider
        initialCart={cartArray}
        children={<CartItem {...mockProps} />}
      />,
    );

    expect(
      document.getElementById(`title${mockResponse[0].id}`).textContent,
    ).toBe(mockResponse[0].title);
    expect(document.getElementById(`image${mockResponse[0].id}`).src).toContain(
      mockResponse[0].image,
    );
    expect(
      document.getElementById(`cost${mockResponse[0].id}`).textContent,
    ).toBe(`$${cartArray[0].cost}.00`);
    expect(
      document.getElementById(`quantity${mockResponse[0].id}`).textContent,
    ).toBe(`${cartArray[0].count}`);
  });

  it(`Increments and decrements values correctly`, async () => {
    const user = userEvent.setup();

    render(
      <CartContextProvider
        initialCart={cartArray}
        children={<CartItem {...mockProps} />}
      />,
    );

    const plus = screen.getByTestId(`plus${mockResponse[0].id}`);
    const minus = screen.getByTestId(`minus${mockResponse[0].id}`);

    await user.click(minus);

    expect(
      document.getElementById(`quantity${mockResponse[0].id}`).textContent,
    ).toBe(`1`);

    await user.click(plus);
    await user.click(plus);

    expect(
      document.getElementById(`quantity${mockResponse[0].id}`).textContent,
    ).toBe(`3`);
  });
});
