import { fireEvent, render, screen } from "@testing-library/react";

import { Button, ButtonProps } from "../../../src/components";

describe("Button test", () => {
  const buttonArgs: ButtonProps = {
    handleClick: vi.fn(() => {}),
    label: "label test",
    className: "class-test",
  };
  beforeEach(() => {
    render(<Button {...buttonArgs} />);
  });

  test("should have the correct label", () => {
    expect(screen.getByText(buttonArgs.label)).toBeDefined();
  });
  test("should have the correct className", () => {
    expect(
      screen.queryByTestId("button-container")?.classList.toString()
    ).contain(buttonArgs.className);
  });
  test("should execute the callback", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(buttonArgs.handleClick).toHaveBeenCalled();
  });
});
