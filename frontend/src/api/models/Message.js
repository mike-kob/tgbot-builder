import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  botId: mongoose.SchemaTypes.ObjectId,
  botOwner: { type: String, index: 1 },
  chatId: Number,
  isBot: Boolean,
  type: String,
  ts: Number,
  msg: Object,
  created: { type: Date, default: Date.now },
});

messageSchema.index({ botId: 1, chatId: 1 });

export default (mongoose.models.Message || mongoose.model('Message', messageSchema));
