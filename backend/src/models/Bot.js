import mongoose from 'mongoose'

const Schema = mongoose.Schema

const botSchema = new Schema({
  owner: String, // uid of owner user
  name: String,
  token: String,
  status: String,
  src: Object,
  created: { type: Date, default: Date.now },
})

export default mongoose.model('Bot', botSchema)
