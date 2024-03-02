import { useState } from "react";
import "../styles.css";
import serv from '../services/blogs';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState();
  const [likes, setLikes] = useState(!isNaN(blog.likes) ? blog.likes : 0);

  const toggleView = () => {
    setVisible(!visible);
  };

  const sendLike = (blog) => {
    let likesParsed = parseInt(likes);
    let likesUpdated = !isNaN(likesParsed) ? likesParsed + 1 : 1;
    setLikes(likesUpdated);
    serv.sendLikes(blog.id, likesUpdated);
  }


  return (
    <div className="blog">
      {blog.title} <button onClick={toggleView}>view</button>
      {visible && (
        <>
          <p>Author: {blog.author}</p>
          {blog.url && <p>URL: {blog.url}</p>}
          {<p>Likes: {likes} <button onClick={() => sendLike(blog)}>like</button></p>}
        </>
      )}
    </div>
  );
};

export default Blog;
