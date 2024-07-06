import { fireEvent, render } from "@testing-library/react";
import { Input } from "../../components/Input";

describe("Input", () => {
  it("should render correctly", () => {
    const { getByPlaceholderText } = render(
      <Input
        handleChange={() => { }}
        value=""
        type="text"
        placeholder="Enter something"
      />);

    const inputElement = getByPlaceholderText("Enter something");
    expect(inputElement).toBeInTheDocument();
  })

  it("should call handleChange on input change", () => {
    const mockChangeHandler = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        handleChange={mockChangeHandler}
        value=""
        type="text"
        placeholder="Enter something"
      />
    );

    const inputElement = getByPlaceholderText("Enter something");
    fireEvent.change(inputElement, { target: { value: "Test value" } });

    expect(mockChangeHandler).toHaveBeenCalled();
  });

  it("should render search icon when searchIcon prop is true", () => {
    const { container } = render(
      <Input
        handleChange={() => { }}
        value=""
        type="text"
        placeholder="Search something"
        searchIcon={true}
      />
    );

    const searchIcon = container.querySelector(".icon-tabler-search");
    expect(searchIcon).toBeInTheDocument();
  });

  it("should render label when label prop is provided", () => {
    const { getByText } = render(
      <Input
        handleChange={() => { }}
        value=""
        type="text"
        placeholder="Enter something"
        label="Input Label"
      />
    );

    const labelElement = getByText("Input Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("should render as textarea when useTextArea prop is true", () => {
    const { container } = render(
      <Input
        handleChange={() => { }}
        value=""
        type="text"
        placeholder="Enter something"
        useTextArea={true}
      />
    );

    const textareaElement = container.querySelector("textarea");
    expect(textareaElement).toBeInTheDocument();
  });

  it("should apply custom styles when styles prop is provided", () => {
    const { container } = render(
      <Input
        handleChange={() => { }}
        value=""
        type="text"
        placeholder="Enter something"
        styles="custom-class"
      />
    );

    const inputElement = container.querySelector(".custom-class");
    expect(inputElement).toBeInTheDocument();
  });
})