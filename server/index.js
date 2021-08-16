const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
// const uuid = require("uuid") // TEMP
require("dotenv").config()
const DB_URI = process.env.DB_URI
const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer,{
  cors : {
    origin : "http://localhost:3000"
  }
})

app.use(cors())
app.use(express.json())

// in memory storage
const InMemoryMessageStore = require("./util/InMemoryMessageStore")
const messageStore = new InMemoryMessageStore()

// routes
const user = require("./routes/user")

app.use("/user", user)
// Temp
app.get("/", (req,res) => res.send("Hello server."))
// socket middleware
io.use((socket, next) => {
  const user = socket.handshake.auth
  if(!user) next(new Error("invalid user"))
  socket.user = {...user}
  next()
})
// socket.io
io.on("connection", socket => {
  socket.join(socket.user._id)
  // getting all users
  const users = []
  for(let [id, socket] of io.of("/").sockets){
    users.push({
      _id : socket.user._id,
      fullName : socket.user.fullName 
    })
  }
  const messagePerUser = new Map()
  // find the message associated with the user
  messageStore.findMessageForUser(socket.user._id).forEach(message => {
    const {from,to} = message
    const otherUser = from === socket.user._id ? to : from
    if(messagePerUser.has(otherUser)){
      messagePerUser.get(otherUser).push(message)
    }else{
      messagePerUser.set(otherUser,[message])
    }
  })

  const usersData = users.map(item => {
    return {
      ...item,
      messages : messagePerUser.get(item._id) || []
    }
  })

  // list of users to new user
  socket.emit("users", usersData)
  // new users to the list of users
  socket.broadcast.emit("user connected",{
    ...socket.user
  })
  // user disconnect
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnect", socket.user)
  })
  // private message
  socket.on("private message", ({content,to}) => {
    const data = {
      content,
      to,
      from : socket.user._id 
    }
    // save the message in the message store    
    messageStore.saveMessage(data)
    // send message to recipient
    socket.to(to).to(socket.user._id).emit("private message", data)

  })
})

// connect db then server listen to port 8080
mongoose.connect(DB_URI,{
  useNewUrlParser : true,
  useUnifiedTopology : true
}, () => {
  console.log("connected to DB")
  httpServer.listen(8080, () => console.log("server listening at port 8080"))
})

