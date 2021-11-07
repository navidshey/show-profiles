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
    expect(
      container.querySelectorAll("p").item(0).textContent ==
        `${mockValidCharacter.name} (${mockValidCharacter.gender})`
    ).toBeTruthy();
    expect(
      container.querySelectorAll("p").item(1).textContent ==
        `${mockValidCharacter.species} (${mockValidCharacter.status})`
    ).toBeTruthy();
    expect(
      container.querySelectorAll("p").item(2).textContent ==
        `Episode Numbers: ${mockValidCharacter.episode.length}(Show Names)`
    ).toBeTruthy();
    expect(
      container.querySelectorAll("p").item(3).textContent ==
        `Location: ${mockValidCharacter.location.name}`
    ).toBeTruthy();
    expect(
      container.querySelectorAll("p").item(4).textContent ==
        `Origin: ${mockValidCharacter.origin.name}`
    ).toBeTruthy();
  });

  it("shoud fetch episode names when click Show Names link", async () => {
    const { container } = renderComponent();
    const span = container.querySelector("span");
    if (span) {
      userEvent.click(span);
      await waitForElementToBeRemoved(() =>
        screen.getAllByText("(Show Names)")
      );
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    }
  });

  it("shoud fetch location and origin data when click Show Details link", async () => {
    const { container } = renderComponent();
    const detail = container.querySelectorAll("span").item(1);
    if (detail) {
      userEvent.click(detail);
      await waitForElementToBeRemoved(() =>
        screen.getAllByText("(Show Details)")
      );
      expect(container.getElementsByClassName("details-box")).toBeTruthy();
    }
  });

  it("should show Error message on failure in fetching details", async () => {
    const { container } = renderComponent({ character: mockInValidCharacter });
    const detail = container.querySelectorAll("span").item(1);
    if (detail) {
      userEvent.click(detail);
      await waitForElementToBeRemoved(() =>
        screen.queryAllByText("(Show Details)")
      );
      expect(
        screen.queryAllByText("Error in loading data!").length == 2
      ).toBeTruthy();
      expect(
        container.getElementsByClassName("details-box").length == 0
      ).toBeTruthy();
    }
  });
});
