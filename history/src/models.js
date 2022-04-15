import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  botId: mongoose.SchemaTypes.ObjectId,
  botOwner: { type: String, index: 1 },
  chatId: Number,
  isBot: Boolean,
  type: String,
  ts: Number,
  msg: Object,
  created: { type: Date, default: Date.now },
})

messageSchema.index({ botId: 1, chatId: 1 })

const botUserSchema = new Schema({
  botId: mongoose.SchemaTypes.ObjectId,
  botOwner: { type: String, index: 1 },
  id: { type: Number },
  firstName: String,
  lastName: String,
  username: String,
  db: Object,
  state: String,
  created: { type: Date, default: Date.now },
})

const botSchema = new Schema({
  owner: String, // uid of owner user
  name: String,
  token: String,
  status: Boolean,
  initState: Object,
  src: Array,
  created: { type: Date, default: Date.now },
})

export const Bot = (mongoose.models.Bot || mongoose.model('Bot', botSchema))
export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)
export const BotUser = mongoose.models.User || mongoose.model('BotUser', botUserSchema)
