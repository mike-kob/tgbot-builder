import mongoose from 'mongoose';

const { Schema } = mongoose;

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
});

export default (mongoose.models.BotUser || mongoose.model('BotUser', botUserSchema));
