import { useState } from "react";
import serv from "../services/blogs";
import "../styles.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useBlogData } from "./BlogContext";

const Blog = () => {
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    mutationFn: serv.updateBlog,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["blogs"] }) }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: serv.deleteBlog,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["blogs"] }) }
  })
  
  const { id } = useParams()
  const { data: blogs } = useBlogData()
  const blog = blogs?.find(blog => blog.id === id)
  const [likes, setLikes] = useState(!isNaN(blog?.likes) ? blog?.likes : 0);

  if (!blog) {
    return null
  }

  const toggleView = () => {
    setVisible(!visible);
  };

  const onClickLikeHandle = (blog) => {
    setLikes(likes => likes + 1)
    const likesUpdated = likes + 1
    updateLikes(blog, likesUpdated)
  };

  const updateLikes = (blog, likes) => {
    updateBlogMutation.mutate({ ...blog, likes })
  }

  const onClickDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  };

  const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogUser"));

  return (
    <div className="blog">
      {blog.title}
      {(
        <>
          <p>Author: {blog.author}</p>
          {blog.url && <p>URL: {blog.url}</p>}
          {
            <p>
              Likes: {likes}{" "}
              <button data-testid="blog-like-button" onClick={() => onClickLikeHandle(blog)}>like</button>
            </p>
          }
          {loggedUser?.username === blog.user?.username && (
            <button onClick={() => onClickDelete(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
