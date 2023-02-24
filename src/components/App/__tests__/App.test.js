import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("The home screen appears conditionally.", () => {
  test("By default, on landing", () => {
    render(<App />);
    const homeScreen = screen.queryByRole("main");
    expect(homeScreen).toBeInTheDocument();
  });

  test("Disappears when starting the form", async () => {
    const user = userEvent.setup();
    render(<App />);
    const homeScreen = screen.queryByRole("main");
    const startButton = screen.queryByRole("button", {
      name: "Make your CV now!",
    });
    await user.click(startButton);
    expect(homeScreen).not.toBeInTheDocument();
  });
});
