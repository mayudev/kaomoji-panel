import { cleanup, render, screen } from "@testing-library/react";
import Preference from "../components/preferences/Preference";

(global.localStorage as any) = {};

describe("Preference", () => {
  afterAll(() => {
    cleanup();
  });

  it("should display information", () => {
    const name = "Name";
    const description = "Descriptiopn";
    render(
      <Preference property="whatever" name={name} description={description} />
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  // TODO add a localStorage test
});
