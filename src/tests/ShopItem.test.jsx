import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopItem from "../components/ShopItem";
import { CartContextProvider } from "../components/CartContext";
import { mockCart, mockResponse } from "./mocks";

// Mock the cart
const cartArray = mockCart;

// Mock the props passed to ShopItem component
const mockProps = {
  id: mockResponse[0].id,
  title: mockResponse[0].title,
  image: mockResponse[0].image,
  price: mockResponse[0].price,
};

describe("ShopItem Component", () => {
  it(`Displays correct values passed by props`, () => {
    render(
      <CartContextProvider
        initialCart={cartArray}
        children={<ShopItem {...mockProps} />}
      />,
    );

    expect(
      document.getElementById(`title${mockResponse[0].id}`).textContent,
    ).toBe(mockResponse[0].title);
    expect(document.getElementById(`image${mockResponse[0].id}`).src).toContain(
      mockResponse[0].image,
    );
    expect(
      document.getElementById(`price${mockResponse[0].id}`).textContent,
    ).toBe(`$${mockResponse[0].price}.00`);
    expect(
      document.getElementById(`quantity${mockResponse[0].id}`).value,
    ).toEqual(`0`);
  });

  it(`Increments and decrements values correctly`, async () => {
    const user = userEvent.setup();

    render(
      <CartContextProvider
        initialCart={cartArray}
        children={<ShopItem {...mockProps} />}
      />,
    );

    const plus = screen.getByTestId(`plus${mockResponse[0].id}`);
    const minus = screen.getByTestId(`minus${mockResponse[0].id}`);
    const input = document.getElementById(`quantity${mockResponse[0].id}`);
    await user.click(minus);

    expect(input.value).toBe(`0`);

    await user.click(plus);
    await user.click(plus);

    expect(input.value).toBe(`2`);

    await user.click(minus);

    expect(input.value).toBe(`1`);

    // Check that it shows '0' when input is deleted
    await userEvent.clear(input);

    expect(input.value).toBe("0");

    // Check that typing in number shows the correct value
    await userEvent.type(input, "20");

    expect(input.value).toBe("20");
  });
});
