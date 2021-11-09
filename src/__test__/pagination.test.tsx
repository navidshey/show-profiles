import React from "react";
import { render } from "@testing-library/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { PaginationInfo } from "../api/profile/profile";
import Pagination from "./../components/custom/Pagination/Pagination";

function renderComponent(props?: PaginationInfo) {
  const defaultProps: PaginationInfo = {
    prev: undefined,
    next: undefined,
    pages: 1,
    count: "10",
  };
  return render(
    <BrowserRouter>
      <Switch>
        <Route>
          {" "}
          <Pagination {...defaultProps} {...props} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

describe("<PaginationInfo>", () => {
  it("should show 1 box in pages:1 and prev=null and next=null", async () => {
    const { container } = renderComponent();
    expect(container.querySelector("a")).toHaveTextContent("1");
    expect(container.querySelectorAll("a")?.length == 1).toBeTruthy();
  });

  it("should show 2 box in pages:2 and has next", async () => {
    const { container } = renderComponent({
      next: "https://rickandmortyapi.com/api/character?page=2",
      pages: 2,
      count: "30",
    });
    expect(container.querySelectorAll("a")?.length == 2).toBeTruthy();
  });

  it("should show 2 box in pages:2 and has prev only", async () => {
    const { container } = renderComponent({
      prev: "https://rickandmortyapi.com/api/character?page=1",
      pages: 2,
      count: "30",
    });
    expect(container.querySelectorAll("a")?.length == 2).toBeTruthy();
  });

  it("should show 3 box in pages:3 and has next page and not prev", () => {
    const { container } = renderComponent({
      next: "https://rickandmortyapi.com/api/character?page=2",
      pages: 3,
      count: "70",
    });
    expect(container.querySelectorAll("a")?.length == 3).toBeTruthy();
  });

  it("should show 3 box in pages:3 and has next and prev page and is middle of pages", () => {
    const { container } = renderComponent({
      prev: "https://rickandmortyapi.com/api/character?page=1",
      next: "https://rickandmortyapi.com/api/character?page=3",
      pages: 3,
      count: "70",
    });
    expect(container.querySelectorAll("a")?.length == 3).toBeTruthy();
  });

  it("should show 4 box in pages:4 and has next and prev page and is middle of pages", () => {
    const { container } = renderComponent({
      prev: "https://rickandmortyapi.com/api/character?page=1",
      next: "https://rickandmortyapi.com/api/character?page=3",
      pages: 4,
      count: "70",
    });
    expect(container.querySelectorAll("a")?.length == 4).toBeTruthy();
  });

  it("should show 5 box in pages:5 when has next and prev page and is middle of pages", () => {
    const { container } = renderComponent({
      prev: "https://rickandmortyapi.com/api/character?page=1",
      next: "https://rickandmortyapi.com/api/character?page=3",
      pages: 4,
      count: "70",
    });
    expect(container.querySelectorAll("a")?.length == 4).toBeTruthy();
  });

  it("should show 5 box in pages:5 when has next and prev page and is middle of pages", () => {
    const { container } = renderComponent({
      prev: "https://rickandmortyapi.com/api/character?page=1",
      next: "https://rickandmortyapi.com/api/character?page=3",
      pages: 4,
      count: "70",
    });
    expect(container.querySelectorAll("a")?.length == 4).toBeTruthy();
  });

  it("should show 4 box in pages>3 and is last page", () => {
    const { container } = renderComponent({
      prev: "https://rickandmortyapi.com/api/character?page=3",
      pages: 4,
      count: "70",
    });
    expect(container.querySelectorAll("a")?.length == 3).toBeTruthy();
  });

  it("should act by next value when prev is equal or bigger than next", () => {
    const { container } = renderComponent({
      prev: "https://rickandmortyapi.com/api/character?page=4",
      next: "https://rickandmortyapi.com/api/character?page=3",
      pages: 4,
      count: "70",
    });
    expect(container.querySelectorAll("a")?.length == 4).toBeTruthy();
  });
});
