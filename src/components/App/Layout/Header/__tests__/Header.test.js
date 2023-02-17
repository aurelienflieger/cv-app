import Header from "../Header";
import createMatchMedia from "../../../../../jest/helpers";
import { render, screen } from "@testing-library/react";

describe("The header is fully displayed.", () => {
  const currentSection = "general-information";

  test("Header", () => {
    render(<Header currentSection={currentSection} />);
    const header = screen.queryByRole("banner");
    expect(header).toBeInTheDocument();
  });

  test("Header icon", () => {
    render(<Header currentSection={currentSection} />);
    const headerIcon = screen.queryByRole("img", { name: "header icon" });
    expect(headerIcon).toBeInTheDocument();
  });
});

describe("The header icon displayed is correct", () => {
  test("General Information", () => {
    render(<Header currentSection="general-information" />);
    const headerIcon = screen.queryByRole("img", { name: "header icon" });
    expect(headerIcon.src).toContain("general-information");
  });

  test("Profile Picture", () => {
    render(<Header currentSection="profile-picture" />);
    const headerIcon = screen.queryByRole("img", { name: "header icon" });
    expect(headerIcon.src).toContain("profile-picture");
  });

  test("Career", () => {
    render(<Header currentSection="education" />);
    const headerIcon = screen.queryByRole("img", { name: "header icon" });
    expect(headerIcon.src).toContain("education");
  });

  test("Education", () => {
    render(<Header currentSection="general-information" />);
    const headerIcon = screen.queryByRole("img", { name: "header icon" });
    expect(headerIcon.src).toContain("general-information");
  });
});

describe("The header background image displays correctly.", () => {
  test("Not displayed on a regular screen", () => {
    render(<Header currentSection="general-information" />);
    const header = screen.queryByRole("banner");
    const backgroundURL =
      "background-image: url(../../../assets/backgrounds/general-information_light.jpg)";
    expect(header).not.toHaveStyle(backgroundURL);
  });

  test("Displayed on a mobile screen", () => {
    window.matchMedia = createMatchMedia(window.innerWidth);
    render(<Header currentSection="general-information" />);
    const header = screen.queryByRole("banner");
    const backgroundURL =
      "background-image: url(general-information_light.jpg)";
    expect(header).toHaveStyle(backgroundURL);
  });
});

describe("The header background image changes according to the current color theme.", () => {
  test("Light background in light mode", () => {
    window.matchMedia = createMatchMedia(window.innerWidth);
    render(<Header currentSection="general-information" />);
    const header = screen.queryByRole("banner");
    const backgroundURL =
      "background-image: url(general-information_light.jpg)";
    expect(header).toHaveStyle(backgroundURL);
  });

  test("Dark background in Dark mode", () => {
    window.matchMedia = createMatchMedia(window.innerWidth);
    render(
      <Header currentSection="general-information" darkThemeEnabled={true} />
    );
    const header = screen.queryByRole("banner");
    const backgroundURL = "background-image: url(general-information_dark.jpg)";
    expect(header).toHaveStyle(backgroundURL);
  });
});
