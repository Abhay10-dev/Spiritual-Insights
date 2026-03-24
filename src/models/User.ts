import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  emailVerified: Date,
  fcmToken: String,
  fcmUpdatedAt: Date,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
