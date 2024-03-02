import { useState } from "react";
import "../styles.css";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState();

  const toggleView = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog">
      {blog.title} <button onClick={toggleView}>view</button>
      {visible && (
        <>
          <p>Author: {blog.author}</p>
          {blog.url && <p>URL: {blog.url}</p>}
          {parseInt(blog.likes) >= 0 && <p>Likes: {blog.likes}</p>}
        </>
      )}
    </div>
  );
};

export default Blog;
