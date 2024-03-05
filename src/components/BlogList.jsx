import Blog from "./Blog";
import serv from "../services/blogs";

const BlogList = ({ blogs, setBlogs }) => {
  const onClickLikeHandle = (blog, totalLikes) => {
    serv.sendLikes(blog.id, totalLikes);
  };

  const onDelete = (id) => {
    setBlogs((currentBlogs) => currentBlogs.filter(b => b.id !== id));
  };

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onClickLikeHandle={onClickLikeHandle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BlogList;
