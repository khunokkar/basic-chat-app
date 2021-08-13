import axios from 'axios'

const server = 'http://localhost:8080/user/'

export const loginUser = (data) => {
    return axios({
      method : 'POST',
      url : server + 'login',
      data : data
    })  
}

export const registerUser = (data) => {
   return axios({
      method : 'POST',
      url : server + 'register',
      data : data
    })
}