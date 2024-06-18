import { useEffect, useRef, useContext } from "react";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import UserDetails from "./components/UserDetails";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import { useNotification } from "./components/notification/useNotification";
import { useMutation } from "@tanstack/react-query";
import UserContext from "./components/UserContext";
import Users from "./components/Users";
import { Link, BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserStats from "./components/UserStats";
import Blog from "./components/Blog";
import { useBlogData } from "./components/BlogContext";
const App = () => {
  const { notifications } = useNotification()
  const [user] = useContext(UserContext)

  return (
    <div>
      <Notifications notifications={notifications} />
      <Router>
        {user && <Link to="/">Home</Link>}
        {user && <Link to="/users">Users statistics</Link>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={user ? <Users /> : <Navigate to="/" />}>
            <Route path=":id" element={<UserStats />} />
          </Route>
          <Route path="/blogs/:id" element={user ? <Blog /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

const Home = () => {
  const [user, userDispatch] = useContext(UserContext)
  const { addNotification } = useNotification()
  const fetchedBlogs = useBlogData()
  
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
}

export default App;
