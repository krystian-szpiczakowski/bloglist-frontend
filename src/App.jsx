import { useState, useEffect, useRef } from "react";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import UserDetails from "./components/UserDetails";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((blogOne, blogTwo) => {
        const likesOne = blogOne.likes || 0;
        const likesTwo = blogTwo.likes || 0;

        return likesTwo - likesOne;
    })));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    setUser(JSON.parse(loggedUserJson));
  }, []);

  useEffect(() => {
    const removeNotification = (id) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
    };

    const lastNotification = notifications[notifications.length - 1];
    if (lastNotification) {
      const timeoutId = setTimeout(() => {
        removeNotification(lastNotification.id);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [notifications]);

  const onLoginSuccess = (loggedUser) => {
    const loggedUserString = JSON.stringify(loggedUser);
    window.localStorage.setItem("loggedBlogUser", loggedUserString);
    setUser(loggedUser);
  };

  const onLoginError = (error) => {
    const notificationId = Date.now();
    const newNotification = { id: notificationId, message: error.message };
    setNotifications([...notifications, newNotification]);
  };

  const onLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  const toggleFormRef = useRef();
  const formRef = useRef();

  const onCreateBlog = async (blog) => {
    const blogCreated = await blogService.create(blog);
    setBlogs(blogs.concat(blogCreated));

    toggleFormRef.current.toggleVisibility();
    formRef.current.clearInputs();
  };

  return (
    <div>
      <Notifications notifications={notifications} />
      {!user && (
        <LoginForm
          onLoginSuccess={onLoginSuccess}
          onLoginError={onLoginError}
        />
      )}
      {user && <UserDetails user={user} onLogout={onLogout} />}
      {user && (
        <Togglable buttonLabel="New blog" ref={toggleFormRef}>
          <NewBlog onCreate={onCreateBlog} ref={formRef} />
        </Togglable>
      )}
      {user && <BlogList blogs={blogs} />}
    </div>
  );
};

export default App;
