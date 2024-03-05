import { useState, useImperativeHandle, forwardRef } from "react";

const NewBlog = forwardRef((props, refs) => {
  const onCreate = props.onCreate;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    onCreate({ title, author, url });
  };

  const clearInputs = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  useImperativeHandle(refs, () => {
    return {
      clearInputs,
    };
  });

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            data-testid="blog-title-input"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div></div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            data-testid="blog-author-input"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            data-testid="blog-url-input"
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button data-testid="blog-create-button" type="submit">create</button>
      </form>
    </div>
  );
});

NewBlog.displayName = "New Blog";

export default NewBlog;
