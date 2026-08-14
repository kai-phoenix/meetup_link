import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  it("shows the service description and authentication links", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "イベントの予定と参加者を、ひとつに。" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ログイン" })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: "新規登録" })).toHaveAttribute("href", "/register");
  });
});
