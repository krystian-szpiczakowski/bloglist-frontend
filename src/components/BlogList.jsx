import { Link } from "react-router-dom";
const BlogList = ({ fetchedBlogs }) => {
  if (fetchedBlogs.isLoading) {
    return <div>loading blogs...</div>;
  }

  if (fetchedBlogs.isError) {
    return <div>blogs could not be loaded</div>
  }


  const blogs = fetchedBlogs.data?.sort((blogOne, blogTwo) => blogTwo.likes - blogOne.likes)
  if (!blogs) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <ul className="bloglist">
        {blogs.map((blog) => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;