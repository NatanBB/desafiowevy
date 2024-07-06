import { render } from "@testing-library/react";
import { ToggleButton } from "../../components/ToggleButton";

describe("ToggleButton", () => {
  it("should render correctly with initial checked state", () => {
    const label = "Option 1";
    const isChecked = true;
    const onChange = jest.fn();

    const { getByLabelText } = render(
      <ToggleButton label={label} isChecked={isChecked} onChange={onChange} />
    );

    const inputElement = getByLabelText(label) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.checked).toBe(true);
  });
});