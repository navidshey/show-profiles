import React from "react";
import { render } from "@testing-library/react";
import ProfileCardRow, { Props } from "../components/profile/profileCardRow";
import ProfileLocation from "../api/location/location";

function renderComponent(props?: Props) {
  const defaultProps: Props = {
    isLoading: true,
    data: undefined,
  };
  return render(<ProfileCardRow {...defaultProps} {...props} />);
}

const location: ProfileLocation = {
  created: "2017-11-10T13:08:13.191Z",
  dimension: "unknown",
  id: 3,
  name: "Citadel of Ricks",
  residents: [
    "https://rickandmortyapi.com/api/character/8",
    "https://rickandmortyapi.com/api/character/14",
  ],
  type: "Space station",
  url: "https://rickandmortyapi.com/api/location/3",
};

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
    const { container } = renderComponent({ isLoading: false, data: location });
    expect(container.querySelectorAll("p").length).toEqual(3);
  });

  it("should show data partially when dimension is empty", async () => {
    const { container } = renderComponent({
      isLoading: false,
      data: { ...location, dimension: "" },
    });
    expect(container.querySelectorAll("p").length).toEqual(2);
  });
});
