import { render, screen } from "@testing-library/react";
import Kaomoji from "../components/Kaomoji";

it("should display kaomoji", () => {
  const content = "(uwu)";
  render(
    <Kaomoji
      content={content}
      onClick={function () {}}
      onRightClick={function () {}}
    />
  );

  expect(screen.getByText(content)).toBeInTheDocument();
});
