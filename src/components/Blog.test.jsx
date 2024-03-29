import { render } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

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
    const button = getByTestId("blog-view-details-button");

    await user.click(button);

    getByText("Component testing is done with react-testing-library");
    getByText("Author: Cristiansen");
    getByText("URL: fakeurl");
    getByText("Likes: 0",);
  });

  test("Pressing like button twice triggers event handler twice", async () => {
    const blog = {
      author: "Cristiansen",
      title: "Component testing is done with react-testing-library",
      url: "fakeurl",
    };

    const mockHandler = vi.fn();
    const { getByText, getByTestId } = render(<Blog blog={blog} onClickLikeHandle={mockHandler} />);
    const user = userEvent.setup();
    

    const viewButton = getByTestId("blog-view-details-button");
    
    await user.click(viewButton);
    const likeButton = getByTestId("blog-like-button");

    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
