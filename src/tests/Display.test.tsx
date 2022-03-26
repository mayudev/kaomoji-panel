import { render, screen } from "@testing-library/react";
import Display from "../pages/Display";

it("should display a cute kaomoji", () => {
  render(<Display />);
  const cute = screen.getAllByText("(✿ ♥‿♥)")[0];
  expect(cute).toBeInTheDocument();
});
