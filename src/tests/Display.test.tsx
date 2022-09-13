/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from "@testing-library/react";
import Display from "../pages/Display";

it("should display a cute kaomoji", () => {
  render(<Display />);
  const cute = screen.getAllByText("(✿ ♥‿♥)")[0];
  expect(cute).toBeInTheDocument();
});

it("should reorder items properly", () => {
  render(<Display />);

  const nav = screen.getByRole("navigation");
  let categories = Array.from(nav.getElementsByTagName("a"));

  const standardCat = categories[0];
  const neutralCat = categories[3];
  expect(standardCat.textContent).toEqual("Standard");
  expect(neutralCat.textContent).toEqual("Neutral");

  fireEvent.dragStart(neutralCat);
  fireEvent.drop(standardCat);

  categories = Array.from(nav.getElementsByTagName("a"));
  expect(categories[1].textContent).toEqual("Standard");
  expect(categories[0].textContent).toEqual("Neutral");
});
