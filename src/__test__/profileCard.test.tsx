import React from "react";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ProfileCard, { Props } from "./../components/profile/profileCard";
import { mockInValidCharacter, mockValidCharacter } from "../mocks/handlers";

function renderComponent(props?: Props) {
  const defaultProps: Props = {
    character: mockValidCharacter,
    loadingCharacter: false,
    episodesLoaded: false,
  };
  return render(<ProfileCard {...defaultProps} {...props} />);
}

describe("<ProfileCard>", () => {
  it("should show image, name and other initial data", async () => {
    const { container } = renderComponent();
    expect(
      container.querySelector("img")?.src == mockValidCharacter.image
    ).toBeTruthy();
    expect(container.querySelectorAll("p").length).toEqual(5);
    expect(container.querySelectorAll("p").item(0)).toHaveTextContent(
      `${mockValidCharacter.name} (${mockValidCharacter.gender})`
    );
    expect(container.querySelectorAll("p").item(1)).toHaveTextContent(
      `${mockValidCharacter.species} (${mockValidCharacter.status})`
    );
    expect(container.querySelectorAll("p").item(2)).toHaveTextContent(
      `Episode Numbers: 1`
    );
    expect(container.querySelectorAll("p").item(3)).toHaveTextContent(
      `Location: ${mockValidCharacter.location.name}`
    );
    expect(container.querySelectorAll("p").item(4)).toHaveTextContent(
      `Origin: ${mockValidCharacter.origin.name}`
    );
  });

  it("shoud fetch location and origin data when click Show Details link", async () => {
    const { getByTestId, getAllByTestId } = renderComponent();
    const detail = getByTestId("show-detail-link");
    if (detail) {
      userEvent.click(detail);
      await waitForElementToBeRemoved(() =>
        screen.getAllByText("(Show Details)")
      );
      expect(getAllByTestId("details-box").length == 2).toBeTruthy();
    }
  });

  it("should show Error message on failure in fetching details", async () => {
    const { getByTestId } = renderComponent({
      character: mockInValidCharacter,
      loadingCharacter: false,
      episodesLoaded: false,
    });
    const detail = getByTestId("show-detail-link");
    if (detail) {
      userEvent.click(detail);
      await waitForElementToBeRemoved(() =>
        screen.queryAllByText("(Show Details)")
      );
      expect(
        screen.queryAllByText("Error in loading data!").length == 2
      ).toBeTruthy();
    }
  });
});
