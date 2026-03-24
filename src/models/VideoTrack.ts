import mongoose from 'mongoose';

const VideoTrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  deity: { type: String, default: '' }, // For filtering in Kids zone
}, { timestamps: true });

export default mongoose.models.VideoTrack || mongoose.model('VideoTrack', VideoTrackSchema);
