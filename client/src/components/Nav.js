import "../styles/nav.css"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteCookie } from "../utility/cookieHandler"
import { logOutUser } from "../redux/user"

const Nav = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    deleteCookie("auth-token")
    dispatch(logOutUser())
    window.location.reload(false);
  }

  return (
    <nav>
      <ul>
        <li><Link to = "/">Home</Link></li>
        {
          !user && 
          <>
          <li><Link to = "/register">Register</Link></li>
          <li><Link to = "/login">LogIn</Link></li>
          </>
        }
        {
          user &&
          <>
          <li><Link to = "/users">Users</Link></li>
          <li onClick = {handleLogOut}>Logout</li>
          </>
        }
      </ul>
    </nav>
  )
}

export default Nav