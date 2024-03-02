import Blog from "./Blog";

const BlogList = ({ blogs, setBlogs }) => {
  const onDelete = (id) => {
    setBlogs((currentBlogs) => currentBlogs.filter(b => b.id !== id));
  };

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BlogList;
