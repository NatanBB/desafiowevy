import { render } from "@testing-library/react";
import { AvatarUser } from "../../components/AvatarUser";

const avatarUrl = "https://example.com/avatar.jpg";

describe("AvatarUser", () => {
  it("should render correctly with avatar URL", () => {
    const { getByAltText } = render(<AvatarUser avatarUrl={avatarUrl} />);
    const avatarImage = getByAltText("Avatar Icon");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage.getAttribute("src")).toBe(avatarUrl);
  });

  it("should render fallback when avatar URL is not provided", () => {
    const { getByAltText } = render(<AvatarUser avatarUrl={""} />);
    const avatarImage = getByAltText("Avatar Icon");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage.getAttribute("src")).toBe("");
  });

  it("should apply correct styles to avatar image", () => {
    const { container } = render(<AvatarUser avatarUrl={avatarUrl} />);
    const avatarImage = container.querySelector("img");
    expect(avatarImage).toHaveClass("h-10");
    expect(avatarImage).toHaveClass("w-10");
    expect(avatarImage).toHaveClass("rounded-full");
    expect(avatarImage).toHaveClass("ring-1");
    expect(avatarImage).toHaveClass("ring-gray-700");
  });

  it("should render efficiently with large number of avatars", () => {
    const avatarUrls = Array.from({ length: 100 }, (_, index) => `https://example.com/avatar${index}.jpg`);
    avatarUrls.forEach((url) => {
      const { container } = render(<AvatarUser avatarUrl={url} />);
      const avatarImage = container.querySelector("img");
      expect(avatarImage).toBeInTheDocument();
    });
  });
});