import { useState } from "react"
import "../styles/standard-forms.css"
import { loginUser } from "../api/user"
import { useDispatch } from "react-redux"
import { loginUser as login } from "../redux/user"
import { setCookie } from "../utility/cookieHandler"
import { useHistory } from "react-router"

const Login = () => {
  const dispatch = useDispatch()
  const [data,setData] = useState({
    email : "",
    password : "apple@123",
  })
  const history = useHistory()
    
  const handleChange = (e) => {
    const {name,value} = e.target
    setData(prevState => ({
      ...prevState,
      [name] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(data).then(({data}) => {
      if(data.token){
        dispatch(login(data.token))
        setCookie(data.token, "auth-token")
        history.push("/")
      }
    }).catch(err => {
      if(err){
        if(err.response.data) alert(err.response.data)
      }
    })
  }

  return (
    <>
    <h1>Please Login</h1>
    <form
      style = {{
        width : "400px"
      }}
      onSubmit = {handleSubmit}
    >
      <label>Email</label>
      <input type = "email" name = "email" value = {data.email} onChange = {handleChange}/>
      <label>Password</label>
      <input type = "password" name = "password" value = {data.password} onChange = {handleChange}/>
      <input type = "submit" />
    </form>
    </>)
}

export default Login