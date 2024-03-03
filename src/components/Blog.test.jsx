import { render } from "@testing-library/react";
import Blog from "./Blog";

import { expect, test, describe } from 'vitest'

describe("Blog component", () => {
  test("renders only title by default", () => {
    const blog = {
      author: "Cristiansen",
      title: "Component testing is done with react-testing-library",
      url: "fakeurl"
    };

    const {getByText, queryByText} = render(<Blog blog={blog} />);
    expect(getByText("Component testing is done with react-testing-library")).toBeInTheDocument();
    expect(queryByText("Cristiansen")).not.toBeInTheDocument();
    expect(queryByText("fakeurl")).not.toBeInTheDocument();
    expect(queryByText("Likes")).not.toBeInTheDocument();
  });
});