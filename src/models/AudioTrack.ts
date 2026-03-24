import mongoose from 'mongoose';

const AudioTrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  fileUrl: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  albumImage: { type: String, default: '' },
  deity: { type: String, default: '' }, // For filtering in Kids zone
}, { timestamps: true });

export default mongoose.models.AudioTrack || mongoose.model('AudioTrack', AudioTrackSchema);
