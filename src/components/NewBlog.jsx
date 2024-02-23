import { useState } from "react";
import blogs from "../services/blogs";

const NewBlog = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const blog = await blogs.create({ title, author, url });
    onCreate(blog);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div></div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
