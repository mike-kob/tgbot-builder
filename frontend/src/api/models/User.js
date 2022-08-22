import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  uid: String,
  profile: Object,
});

export default (mongoose.models.User || mongoose.model('User', userSchema));
