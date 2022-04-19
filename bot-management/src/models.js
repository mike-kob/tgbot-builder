import mongoose from 'mongoose'

const Schema = mongoose.Schema

const botSchema = new Schema({
  owner: String, // uid of owner user
  name: String,
  token: String,
  status: Boolean,
  initState: Object,
  src: Object,
  scheduleEnd: Date,
  created: { type: Date, default: Date.now },
})

export const Bot = (mongoose.models.Bot || mongoose.model('Bot', botSchema))
