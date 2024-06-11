import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
};

const create = async (blog) => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogUser"));
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return response.data;
};

const updateBlog = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
  return response.data;
}

const deleteBlog = async (id) => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogUser"));
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  });
  return response.data;
}

export default { getAll, create, updateBlog, deleteBlog };
