
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createDate:{
      type:Date,
      default: Date.now
  },
  updateDate:{
    type:Date,
    default: Date.now
}
})

module.exports = mongoose.model('User', userSchema)