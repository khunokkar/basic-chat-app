import jwt_decode from "jwt-decode"
import socket from "../utility/socket"

export const loginUser = (data) => {
  return {
    type : "LOGIN",
    payLoad : data
  }
}

export const logOutUser = () => {
  return {
    type : "LOGOUT"
  }
}

const defaultUser = null

const userReducer = (user = defaultUser, action) => {
  switch(action.type){
    case "LOGIN":
      const data = jwt_decode(action.payLoad)
      socket.auth = {
        _id : data._id,
        fullName : data.fullName
      }
      return data
    case "LOGOUT":
      socket.disconnect()
      return null
    default:
      return user
  }
}

export default userReducer