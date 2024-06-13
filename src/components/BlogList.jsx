import Blog from "./Blog";

const BlogList = ({ fetchedBlogs }) => {
  if (fetchedBlogs.isLoading) {
    return <div>loading blogs...</div>;
  }

  if (fetchedBlogs.isError) {
    return null
  }


  const blogs = fetchedBlogs.data?.sort((blogOne, blogTwo) => blogTwo.likes - blogOne.likes)
  if (!blogs) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;