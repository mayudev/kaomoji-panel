import { render, screen } from "@testing-library/react";
import Navigation from "../components/Navigation";

it("should display groups", () => {
  const groupNames = ["group1", "group2", "group3"];
  render(<Navigation groupNames={groupNames} />);

  groupNames.forEach((name, i) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
