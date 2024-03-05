import { render } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { exact } from "prop-types";

describe("Blog component", () => {
  test("renders only title by default", () => {
    const blog = {
      author: "Cristiansen",
      title: "Component testing is done with react-testing-library",
      url: "fakeurl",
    };

    const { getByText, queryByText } = render(<Blog blog={blog} />);
    expect(
      getByText("Component testing is done with react-testing-library")
    ).toBeInTheDocument();
    expect(queryByText("Cristiansen")).not.toBeInTheDocument();
    expect(queryByText("fakeurl")).not.toBeInTheDocument();
    expect(queryByText("Likes")).not.toBeInTheDocument();
  });

  test("renders author, url and likes after clicking the view button", async () => {
    const blog = {
      author: "Cristiansen",
      title: "Component testing is done with react-testing-library",
      url: "fakeurl",
    };

    const { getByText, getByTestId } = render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = getByTestId("blog-view-details");

    await user.click(button);

    getByText("Component testing is done with react-testing-library");
    getByText("Author: Cristiansen");
    getByText("URL: fakeurl");
    getByText("Likes: 0",);
  });
});
