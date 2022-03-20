import { render, screen } from "@testing-library/react";
import Group from "../components/Group";

it("should display group name", () => {
  const groupName = "Group Name";
  render(<Group name={groupName} content={[]} onClick={function (arg) {}} />);

  expect(screen.getByText(groupName)).toBeInTheDocument();
});

it("should display content", () => {
  render(<Group name="Group" content={["kao"]} onClick={function (arg) {}} />);

  expect(screen.getByText("kao")).toBeInTheDocument();
});
