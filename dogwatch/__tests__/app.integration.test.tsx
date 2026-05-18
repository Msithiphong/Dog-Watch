import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

describe("Dog Watch routes", () => {
  it("moves from welcome to auth to household to home", () => {
    const app = renderRouter("src/app", { initialUrl: "/" });

    expect(screen.getByText("Shared care for your beloved pup")).toBeTruthy();

    fireEvent.press(screen.getByText("Get Started"));
    expect(screen.getByText("Welcome back!")).toBeTruthy();

    fireEvent.press(screen.getByText("Sign In"));
    expect(screen.getByText("Your Household")).toBeTruthy();

    fireEvent.press(screen.getByText("Join Household"));
    expect(screen.getByText("Good morning")).toBeTruthy();
    expect(app.getPathname()).toBe("/home");
  });

  it("supports auth mode switching and password visibility", () => {
    renderRouter("src/app", { initialUrl: "/auth" });

    expect(screen.getByText("Welcome back!")).toBeTruthy();
    expect(screen.getByLabelText("Password").props.secureTextEntry).toBe(true);

    fireEvent.press(screen.getByLabelText("Toggle password visibility"));
    expect(screen.getByLabelText("Password").props.secureTextEntry).toBe(false);

    fireEvent.press(screen.getByText("Sign Up"));
    expect(screen.getByText("Create account")).toBeTruthy();
    expect(screen.getByLabelText("Your Name")).toBeTruthy();
  });

  it("supports household join/create switching and demo join", () => {
    const app = renderRouter("src/app", { initialUrl: "/household" });

    expect(screen.getByLabelText("Invite Code")).toBeTruthy();

    fireEvent.press(screen.getByText("Create New"));
    expect(screen.getByLabelText("Household Name")).toBeTruthy();
    expect(screen.getByLabelText("Dog's Name")).toBeTruthy();

    fireEvent.press(screen.getByText("Join Existing"));
    fireEvent.press(screen.getByLabelText("Use demo household"));
    expect(app.getPathname()).toBe("/home");
  });

  it("navigates across the main tabs", () => {
    renderRouter("src/app", { initialUrl: "/home" });

    expect(screen.getByText("Good morning")).toBeTruthy();

    fireEvent.press(screen.getByText("Activity"));
    expect(screen.getByText("Activity Feed")).toBeTruthy();

    fireEvent.press(screen.getByText("Luna"));
    expect(screen.getByText("Dog Profile")).toBeTruthy();

    fireEvent.press(screen.getByText("Team"));
    expect(screen.getByText("Who's been helping?")).toBeTruthy();

    fireEvent.press(screen.getByText("Settings"));
    expect(screen.getByText("Dog Watch v1.0.0")).toBeTruthy();
  });

  it("opens reminders from Home and toggles reminder state", () => {
    renderRouter("src/app", { initialUrl: "/home" });

    fireEvent.press(screen.getByLabelText("Open reminders"));
    expect(screen.getByText("4 active reminders for Luna")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Toggle Weekend walk"));
    expect(screen.getByText("5 active reminders for Luna")).toBeTruthy();
  });

  it("logs activity from the quick log modal and shares it across screens", () => {
    renderRouter("src/app", { initialUrl: "/home" });

    fireEvent.press(screen.getAllByLabelText("Quick log Fed")[0]);
    expect(screen.getByTestId("quick-log-modal")).toBeTruthy();

    fireEvent.changeText(screen.getByLabelText("Quick log note"), "extra dinner");
    fireEvent.press(screen.getByLabelText("Log Fed for Luna"));

    expect(screen.getByText("extra dinner")).toBeTruthy();

    fireEvent.press(screen.getByText("Activity"));
    expect(screen.getByText("Activity Feed")).toBeTruthy();
    expect(screen.getByText("extra dinner")).toBeTruthy();
  });

  it("logs out from settings and returns to welcome", () => {
    const app = renderRouter("src/app", { initialUrl: "/settings" });

    fireEvent.press(screen.getByText("Log Out"));

    expect(app.getPathname()).toBe("/");
    expect(screen.getByText("Shared care for your beloved pup")).toBeTruthy();
  });
});
