const {Schema,model} = require('mongoose')

const userSchema = new Schema({
  fullName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  createdAt: {type: Date, default: Date.now}
})

const User = model('User',userSchema)

module.exports = User