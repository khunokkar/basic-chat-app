import { Switch, Route, Redirect } from "react-router"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCookie } from "./utility/cookieHandler"
import { loginUser } from "./redux/user"

// Components
import Nav from "./components/Nav"
import Login from "./components/Login"
import Register from "./components/Register"
import OnlineUsers from "./components/OnlineUsers" // TEMP
import Chat from "./components/Chat"
import Socket from "./components/Socket"

// Styles
import "./styles/main.css"

const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    // check if user is already logged in.
    if(user === null){
      const token = getCookie("auth-token")
      if(token) {
        dispatch(loginUser(token))
      }
    }
  },[user,dispatch])
  return (
    <main>
      <Nav />
      <div id = "content">
        <Switch>
          <Route exact path = "/">
            <h1>Home Page</h1>
          </Route>
          <Route path = "/login">
            { user ? <Redirect to = "/" /> : <Login />}
          </Route>
          <Route path = "/register">
            { user ? <Redirect to = "/" /> : <Register />}
          </Route>
          <Route path = "/users">
            { user === null ? <Redirect to = "/" /> : <OnlineUsers />}
          </Route>
          <Route path = "/chat/:id">
            { user === null ? <Redirect to = "/" /> : <Chat />}
          </Route>
        </Switch>
      </div>
      {
        user ? <Socket /> : ""
      }
    </main>
  )
}

export default App