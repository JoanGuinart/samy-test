import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@components/Header";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";

describe("Header Component", () => {
  test("renders input field and calls onSearch", async () => {
    const onSearchMock = vi.fn();
    render(<Header onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText("You're looking for something?");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "test");
    expect(onSearchMock).toHaveBeenCalledWith("test");
  });
});
