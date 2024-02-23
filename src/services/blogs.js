import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
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

export default { getAll, create };
