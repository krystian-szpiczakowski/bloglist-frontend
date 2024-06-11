import Blog from "./Blog";

const BlogList = ({ fetchedBlogs }) => {
  const blogs = !fetchedBlogs || fetchedBlogs.isLoading ? [] : fetchedBlogs.data?.sort((blogOne, blogTwo) => blogTwo.likes - blogOne.likes)
  if (fetchedBlogs.isLoading) {
    return <div>loading...</div>;
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