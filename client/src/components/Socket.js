import socket from "../utility/socket"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addUsers, addUser, addMessageFrom, userDisconnect } from "../redux/users"

const Socket = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if(user){
      socket.connect()
      socket.on("users", users => {
        // console.log("list of users")
        // console.log(users)
        const data = users.filter(item => item._id !== user._id).map(item => {
          item["connected"] = true
          return item
        })
        dispatch(addUsers(data))
      })
      socket.on("user connected", user => {
        // console.log("new user connection.")
        // console.log(data)
        dispatch(addUser(user))
      })
      socket.on("user disconnect", user => {
        // console.log("user disconnect")
        // console.log(data)
        // dispatch(removeUser(user))
        dispatch(userDisconnect(user))
      })
      socket.on("private message", data => {
        dispatch(addMessageFrom(data))
      })
    }
  }, [user, dispatch])

  return (<></>)
}

export default Socket