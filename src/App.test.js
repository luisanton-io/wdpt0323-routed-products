import { render, screen } from "@testing-library/react";
import App from "./App";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App 1", () => {
  test("that the app renders", () => {
    render(<App />);
  });
});

describe("App 2", () => {
  test("that true is actually true", () => {
    expect(true).toBe(true);
  });

  test("that the app has a navbar with our name", () => {
    render(<App />);
    const AppLogo = screen.getByText("EPICODE Products");
    expect(AppLogo).toBeInTheDocument();
  });
});
