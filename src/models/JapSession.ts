import mongoose from 'mongoose';

const JapSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mantraName: { type: String, required: true },
  count: { type: Number, required: true },
  completedMalas: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.JapSession || mongoose.model('JapSession', JapSessionSchema);
