const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const routes = express.Router()
const User = require("../models/User")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

routes.post("/register", async (req,res) => {
  try {
    const {fullName, email, password, confirmPassword} = req.body
    let user = await User.findOne({email})
    if(user) throw new Error("Account already exists. Please login.")
    if(password !== confirmPassword) throw new Error("Passwords do not match. Please try again.")
    const saltRounds = 8
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    user = new User({
      fullName, email,
      password : hash
    })
    await user.save()
    return res.status(200).json({
      success : true
    })
  } catch (err) {
      console.log(err.message)
    if(err) return res.status(400).json({
      error : err.message
    })
  }
})

routes.post("/login", async (req,res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) throw new Error('Incorrect email. Please try again.')
    const isMatch = bcrypt.compareSync(password, user.password)  
    if(isMatch){
      const token = jwt.sign({
        _id : user._id,
        fullName : user.fullName,
        email : user.email,
      }, JWT_SECRET) 
      return res.status(200).json({
        token
      })
    } else {
      throw new Error("Passwords do not match. Please try again.")
    }
  } catch (err) {
    if(err) return res.status(400).send(err.message) 
  }
})

module.exports = routes