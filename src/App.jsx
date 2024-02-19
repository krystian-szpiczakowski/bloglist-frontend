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

  const onLoginSuccess = (loggedInUser) => {
    console.log("Hura", loggedInUser);
    setUser(loggedInUser)
  }

  return (
    <div>
      {!user && <LoginForm onLoginSuccess={onLoginSuccess}/>}
      {user && <UserDetails user={user}/>}
      {user && <BlogList blogs={blogs}/>}
    </div>
  )
}

export default App