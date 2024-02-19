import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser")
    setUser(JSON.parse(loggedUserJson))
  }, [])

  const onLoginSuccess = (loggedUser) => {
    window.localStorage.setItem("hehe", "wtf");
    const loggedUserString = JSON.stringify(loggedUser);
    window.localStorage.setItem("loggedBlogUser", loggedUserString);
    setUser(loggedUser)
  }

  const onLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  }

  return (
    <div>
      {!user && <LoginForm onLoginSuccess={onLoginSuccess}/>}
      {user && <UserDetails user={user} onLogout={onLogout}/>}
      {user && <BlogList blogs={blogs}/>}
    </div>
  )
}

export default App