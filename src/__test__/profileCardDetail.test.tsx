import React from "react";
import { render } from "@testing-library/react";
import ProfileCardDetail, {
  Props,
} from "../components/profile/profileCardDetail";
import { mockLocation } from "../mocks/handlers";

function renderComponent(props?: Props) {
  const defaultProps: Props = {
    isLoading: true,
    data: undefined,
  };
  return render(<ProfileCardDetail {...defaultProps} {...props} />);
}

describe("<ProfileCardRow>", () => {
  it("should show loading at initial", async () => {
    const { container } = renderComponent();
    expect(container.querySelector("p")).toHaveTextContent("...");
  });

  it("should show error on no data received", () => {
    const { container } = renderComponent({ isLoading: false });
    expect(container.querySelector("p")).toHaveTextContent(
      "Error in loading data!"
    );
  });

  it("should show data when receive it", async () => {
    const { container } = renderComponent({
      isLoading: false,
      data: mockLocation,
    });
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
