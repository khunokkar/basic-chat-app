import { useState } from "react"
import "../styles/standard-forms.css"
import {registerUser} from "../api/user"
import {useHistory} from "react-router-dom"

const Register = () => {
  const history = useHistory()

  const [data,setData] = useState({
    fullName : "",
    email : "",
    password : "apple@123",
    confirmPassword : "apple@123"
  })

  const handleChange = (e) => {
    const {name,value} = e.target
    setData(prevState => ({
      ...prevState,
      [name] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser(data).then(response => {
      if(response.data.success){
        alert("Account created!")
        setData({
          fullName : "",
          email : "",
          password : "",
          confirmPassword : "" 
        })
        history.push("/login")
      }
    }).catch(err => {
      if(err){
        alert(err.response.data.error)
      }
    } )
  }

  return (
    <>
    <h1>Create An Account</h1>
    <form
      style = {{
        width : "400px"
      }}
      onSubmit = {handleSubmit}
    >
      <label>Full Name</label>
      <input type = "text" name = "fullName" value = {data.fullName} onChange = {handleChange}/>
      <label>Email</label>
      <input type = "email" name = "email" value = {data.email} onChange = {handleChange}/>
      <label>Password</label>
      <input type = "password" name = "password" value = {data.password} onChange = {handleChange}/>
      <label>Confirm Password</label>
      <input type = "password" name = "confirmPassword" value = {data.confirmPassword} onChange = {handleChange}/>
      <input type = "submit" />
    </form>
    </>
  )
}

export default Register