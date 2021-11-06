import React from "react";
import { render } from "@testing-library/react";
import ProfileCardRow, { Props } from "../components/profile/profileCardRow";
import { mockLocation } from "../mocks/handlers";

function renderComponent(props?: Props) {
  const defaultProps: Props = {
    isLoading: true,
    data: undefined,
  };
  return render(<ProfileCardRow {...defaultProps} {...props} />);
}


describe("<ProfileCardRow>", () => {
  it("should show loading at initial", async () => {
    const { container } = renderComponent();
    expect(container.querySelector("p")?.textContent == " ... ").toBeTruthy();
  });

  it("should show error on no data received", () => {
    const { container } = renderComponent({ isLoading: false });
    expect(
      container.querySelector("p")?.textContent == " Error in loading data! "
    ).toBeTruthy();
  });

  it("should show data when receive it", async () => {
    const { container } = renderComponent({ isLoading: false, data: mockLocation });
    expect(container.querySelectorAll("p").length).toEqual(3);
  });

  it("should show data partially when dimension is empty", async () => {
    const { container } = renderComponent({
      isLoading: false,
      data: { ...mockLocation, dimension: "" },
    });
    expect(container.querySelectorAll("p").length).toEqual(2);
  });
});
