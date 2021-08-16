// TEMP
import "../styles/chat.css"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import socket from "../utility/socket"
import { addMessageTo } from "../redux/users"
import { useDispatch, useSelector } from "react-redux"

const Chat = () => {
  const {user,users} = useSelector(state => state)
  const param = useParams()  
  const [message, setMessage] = useState("")
  const dispatch = useDispatch() 
  const [chatUser, setChatUser] = useState(null)
  
  useEffect(() => {
    if(chatUser === null){
      setChatUser(users.filter(item => item._id === param.id)[0])
    }
  }, [users,param])
  
  const handleChange = (e) => setMessage(e.target.value)

  const handleSubmit = (e) => {
    
    e.preventDefault()
    
    socket.emit("private message", {
      content : message,
      to : param.id
    })

    dispatch(addMessageTo({
      content : message,
      to : param.id,
      from : user._id      
    }))

    setMessage("")
  }
  if(!chatUser) return <h1>Loading...</h1>
  
  return (
    <div id = "chat-window">
      <div id = "display-chat">
        <ul>
          {
            chatUser.messages && chatUser.messages.map((item,i) => {
              return (
                <li key = {i} className = {item.from === user._id ? "from-user" : "from-friend"}>
                  <span className = "chat-display-name">{item.from === user._id && user.fullName}</span>
                  <span className = "chat-display-name">{item.from === chatUser._id && chatUser.fullName}</span>
                  {item.content}
                </li>
              )
            })
          }
        </ul>
      </div>
      <form onSubmit = {handleSubmit} >
        <textarea value = {message} onChange = {handleChange}/>
        <input type = "submit" />
      </form>
    </div>
  )
}

export default Chat