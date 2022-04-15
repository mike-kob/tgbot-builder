import mongoose from 'mongoose'

const Schema = mongoose.Schema

const botSchema = new Schema({
  owner: String, // uid of owner user
  name: String,
  description: String,
  token: String,
  status: Boolean,
  src: Object,
  created: { type: Date, default: Date.now },
})

export default (mongoose.models.Bot || mongoose.model('Bot', botSchema))
