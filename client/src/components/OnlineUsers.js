// TEMP
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const OnlineUsers = () => {
  const users = useSelector(state => state.users)
  const [data,setData] = useState([])
  const history = useHistory()
  
  useEffect(() => {
    setData(users)
  },[users])
  
  const sendMessage = (id) => history.push("/chat/"+id)
  
  return (
    <>
      <ul
        style = {{listStyle : "none"}}
      >
        {
          data.map((item,i) => <li key = {i}>{item.connected ? "🟢" : "🌑"} {item.fullName} <button onClick = {() => sendMessage(item._id)}>Send Message</button></li>)
        }
      </ul>
    </>
  )
}

export default OnlineUsers