import { render, fireEvent } from "@testing-library/react";
import { Button } from "../../components/Button";

describe("Button", () => {
  it("should render correctly with text and styles", () => {
    const buttonText = "Click me";
    const buttonStyles = "bg-blue-500 text-white";
    const { getByText } = render(
      <Button styles={buttonStyles} textButton={buttonText} />
    );
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(buttonStyles);
  });

  it("should have correct type attribute", () => {
    const { getByText } = render(
      <Button type="submit" styles="bg-blue-500 text-white" textButton="Submit" />
    );
    const buttonElement = getByText("Submit");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("should call onClick function when clicked", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button
        styles="bg-blue-500 text-white"
        textButton="Click me"
        onClick={mockOnClick}
      />
    );
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should apply additional styles when provided", () => {
    const buttonStyles = "bg-red-500 text-white";
    const { getByText } = render(
      <Button styles={`${buttonStyles} rounded-md`} textButton="Custom Button" />
    );
    const buttonElement = getByText("Custom Button");
    expect(buttonElement).toHaveClass(buttonStyles);
    expect(buttonElement).toHaveClass("rounded-md");
  });

  it("should have accessible text", () => {
    const buttonText = "Accessibility Test";
    const { getByText } = render(
      <Button styles="bg-blue-500 text-white" textButton={buttonText} />
    );
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });
});