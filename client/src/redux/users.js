// TEMP
export const addUsers = (data) => {
  return {
    type : "ADD_USERS",
    payLoad : data
  }
}

export const addUser = (data) => {
  return {
    type : "ADD_USER",
    payLoad : data
  }
}

export const userDisconnect = (data) => {
  return {
    type : "USER_DISCONNECT",
    payLoad : data
  }
}

export const removeUser = (data) => {
  return {
    type : "REMOVE_USER",
    payLoad : data
  }
}

export const addMessageFrom = (data) => {
  return {
    type : "ADD_MESSAGE_FROM",
    payLoad : data
  }
}

export const addMessageTo = (data) => {
  return {
    type : "ADD_MESSAGE_TO",
    payLoad : data
  }
}

// helper func
function addChat(users,data,id){
  const index = users.findIndex(item => item._id === id)
  if(users[index]){
    if("messages" in users[index]){
      users[index]["messages"].push(data)
    } else {      
      users[index]["messages"] = [data]
    }
  }
  return users
}

const defaultUsers = []

const usersReducer = (users = defaultUsers, action) => {
  switch(action.type){
    case "ADD_USERS":
      return [...action.payLoad]
    case "ADD_USER":
      const i = users.findIndex(item => item._id === action.payLoad._id)
      if(users[i]){
        users[i]["connected"] = true
        return [...users]
      } else {
        action.payLoad["connected"] = true
        return [...users, action.payLoad]
      }
    case "USER_DISCONNECT":
      return [...users].map(item => {
        if(item._id === action.payLoad._id) item["connected"] = false
        return item
      })    
    case "REMOVE_USER":
      const arr = users.filter(item => item._id !== action.payLoad._id)
      return [...arr]
    case "ADD_MESSAGE_FROM":
      return addChat([...users],action.payLoad,action.payLoad.from)
    case "ADD_MESSAGE_TO":  
      return addChat([...users],action.payLoad,action.payLoad.to)
    default:
      return users
  }
}

export default usersReducer