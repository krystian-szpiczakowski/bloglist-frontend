import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";

test("Calls event handler when a new blog created", async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  const { getByTestId } = render(<NewBlog onCreate={mockHandler} />);
  const inputTitle = getByTestId("blog-title-input");
  await user.type(inputTitle, "onetwo");
  
  const inputAuthor = getByTestId("blog-author-input");
  await user.type(inputAuthor, "itsme");

  const inputUrl = getByTestId("blog-url-input");
  await user.type(inputUrl, "fakeurl");

  const createButton = getByTestId("blog-create-button");
  await user.click(createButton);

  const expectedObject = {
    title: "onetwo",
    author: "itsme",
    url: "fakeurl",
  };

  expect(mockHandler).toHaveBeenCalledWith(
    expectedObject
  );
});
