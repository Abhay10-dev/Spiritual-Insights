import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  pdfUrl: { type: String, default: '' },
  coverImage: { type: String, default: '' }, // This can be an emoji or image URL
  deity: { type: String, default: '' }, // For filtering in Kids stories
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
