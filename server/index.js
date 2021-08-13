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

  // all users
  const users = []
  for(let [id, socket] of io.of("/").sockets){
    users.push({
      _id : socket.user._id,
      fullName : socket.user.fullName
    })
  }

  // list of users to new user
  socket.emit("users", users)

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
  
    socket.to(to).to(socket.user._id).emit("private message", {
      content,
      to,
      from : socket.user._id
    })

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

