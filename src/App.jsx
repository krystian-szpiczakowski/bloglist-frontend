import { useState, useEffect, useRef } from "react";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import UserDetails from "./components/UserDetails";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import { useNotification } from "./components/notification/useNotification";
import { useMutation, useQuery } from "@tanstack/react-query";

const App = () => {
  const fetchedBlogs = useQuery(
    {
      queryKey: ["blogs"],
      queryFn: blogService.getAll
    }
  );
  const [user, setUser] = useState(null);
  const { notifications, addNotification } = useNotification()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    setUser(JSON.parse(loggedUserJson));
  }, []);

  const onLoginSuccess = (loggedUser) => {
    const loggedUserString = JSON.stringify(loggedUser);
    window.localStorage.setItem("loggedBlogUser", loggedUserString);
    setUser(loggedUser);
  };

  const onLoginError = (error) => {
    addNotification(error.message);
  };

  const onLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  const toggleFormRef = useRef();
  const formRef = useRef();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => { fetchedBlogs.refetch() }
  })

  const onCreateBlog = async (blog) => {
    createBlogMutation.mutate(blog)
    toggleFormRef.current.toggleVisibility()
    formRef.current.clearInputs()
  };

  return (
    <div>
      <Notifications notifications={notifications} />
      {!user && (
        <LoginForm
          onLoginSuccess={onLoginSuccess}
          onLoginError={onLoginError}
        />
      ) || <UserDetails user={user} onLogout={onLogout} />}

      {user && (
        <Togglable buttonLabel="New blog" ref={toggleFormRef}>
          <NewBlog onCreate={onCreateBlog} ref={formRef} />
        </Togglable>
      )}

      {user && <BlogList fetchedBlogs={fetchedBlogs} />}
    </div>
  );
};

export default App;
