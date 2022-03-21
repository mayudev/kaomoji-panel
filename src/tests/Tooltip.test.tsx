import { render, screen } from "@testing-library/react";
import Tooltip from "../components/Tooltip";

it("should display message", () => {
  const message = "Tested!";
  render(<Tooltip message={message} />);

  expect(screen.getByText(message)).toBeInTheDocument();
});
