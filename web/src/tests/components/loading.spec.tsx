import { render } from "@testing-library/react";
import { LoadingSpinner } from "../../components/Loading";

describe("LoadingSpinner", () => {
  it("should render the loading spinner", () => {
    const { getByRole } = render(<LoadingSpinner />);

    const statusElement = getByRole("status");
    expect(statusElement).toBeInTheDocument();

    const svgElement = statusElement.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass("w-8");
    expect(svgElement).toHaveClass("h-8");
    expect(svgElement).toHaveClass("text-gray-200");
    expect(svgElement).toHaveClass("animate-spin");
    expect(svgElement).toHaveClass("fill-blue-600");

    const paths = svgElement.querySelectorAll("path");
    expect(paths.length).toBe(2);
  });
});