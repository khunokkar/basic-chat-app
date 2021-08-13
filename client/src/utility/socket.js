import {io} from "socket.io-client"

const socket = io("http://localhost:8080",{
  autoConnect : false
})

// TEMP : for dev purpose only.
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket