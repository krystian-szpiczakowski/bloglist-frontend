import { useState, useEffect, useRef, useContext } from "react";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import UserDetails from "./components/UserDetails";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import { useNotification } from "./components/notification/useNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserContext from "./components/UserContext";

const App = () => {
  const [user, userDispatch] = useContext(UserContext)

  const fetchedBlogs = useQuery(
    {
      queryKey: ["blogs"],
      queryFn: blogService.getAll
    }
  );
  const { notifications, addNotification } = useNotification()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJson === null) {
      return
    }
    
    userDispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(loggedUserJson) });
  }, []);

  const onLoginSuccess = (loggedUser) => {
    const loggedUserString = JSON.stringify(loggedUser);
    window.localStorage.setItem("loggedBlogUser", loggedUserString);
    userDispatch({ type: "LOGIN_SUCCESS", payload: loggedUser });
  };

  const onLoginError = (error) => {
    addNotification(error.message);
  };

  const onLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    console.log("onLogout localstorage",window.localStorage.getItem("loggedBlogUser"))
    userDispatch({ type: "LOGOUT" });
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
