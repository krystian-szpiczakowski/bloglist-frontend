import { useState } from "react";
import "../styles.css";

const Blog = ({ blog, onClickLikeHandle, onDelete }) => {
  const [visible, setVisible] = useState();
  const [likes, setLikes] = useState(!isNaN(blog.likes) ? blog.likes : 0);

  const toggleView = () => {
    setVisible(!visible);
  };

  const onClickLike = (blog) => {
    let likesParsed = parseInt(likes);
    let likesUpdated = !isNaN(likesParsed) ? likesParsed + 1 : 1;
    setLikes(likesUpdated);

    onClickLikeHandle(blog, likesUpdated);
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      serv.deleteBlog(blog.id);
      onDelete(blog.id);
    }
  };

  const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogUser"));

  return (
    <div className="blog">
      {blog.title} <button data-testid="blog-view-details-button" onClick={toggleView}>view</button>
      {visible && (
        <>
          <p>Author: {blog.author}</p>
          {blog.url && <p>URL: {blog.url}</p>}
          {
            <p>
              Likes: {likes}{" "}
              <button data-testid="blog-like-button" onClick={() => onClickLike(blog)}>like</button>
            </p>
          }
          {loggedUser?.username === blog.user?.username && (
            <button onClick={() => deleteBlog(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
