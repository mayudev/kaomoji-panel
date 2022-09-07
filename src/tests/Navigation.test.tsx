import { render, screen } from "@testing-library/react";
import Navigation from "../components/Navigation";

it("should display groups", () => {
  const groupNames = ["group1", "group2"];
  render(
    <Navigation
      groups={[
        { id: 0, title: "group1", contents: [] },
        { id: 1, title: "group2", contents: [] },
      ]}
      moveItem={() => {}}
    />
  );

  groupNames.forEach((name, i) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
