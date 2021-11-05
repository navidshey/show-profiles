import React from "react";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ProfileCard, {
  ProfileCardInterface,
} from "./../components/profile/profileCard";

const mockValidCharacter = {
  created: "2017-11-04T18:48:46.250Z",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  gender: "Male",
  id: 1,
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  name: "Rick Sanchez",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/2",
  },
  species: "Human",
  status: "Alive",
  type: "",
  url: "https://rickandmortyapi.com/api/character/1",
};

const mockInValidCharacter = {
  created: "2017-11-04T18:48:46.250Z",
  episode: ["https://rickandmortyapi.com/api/episode/4"],
  gender: "Male",
  id: 4,
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/4",
  },
  name: "Rick Sanchez",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/4",
  },
  species: "Human",
  status: "Alive",
  type: "",
  url: "https://rickandmortyapi.com/api/character/4",
};

function renderComponent(props?: ProfileCardInterface) {
  const defaultProps: ProfileCardInterface = {
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
    expect(container.querySelectorAll("p").length).toEqual(6);
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
    expect(
      container.querySelectorAll("p").item(5).textContent == "(Show Details)"
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
    const detail = container.getElementsByClassName("episode-name").item(1);
    if (detail) {
      userEvent.click(detail);
      await waitForElementToBeRemoved(() =>
        screen.getAllByText("(Show Details)")
      );
      expect(container.getElementsByClassName("details-box")).toBeTruthy();
    }
  });

  it("shoud fetch location and origin data when click Show Details link", async () => {
    const { container } = renderComponent({ character: mockInValidCharacter });
    const detail = container.getElementsByClassName("episode-name").item(1);
    if (detail) {
      userEvent.click(detail);
      expect(
        container.getElementsByClassName("details-box").length == 0
      ).toBeTruthy();
    }
  });
});
