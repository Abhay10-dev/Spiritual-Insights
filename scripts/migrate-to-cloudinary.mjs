/**
 * Cloudinary Migration Script for Spiritual Insights
 * This script uploads local media files (PDFs, Audio, Icons) to Cloudinary 
 * and updates the corresponding MongoDB Atlas documents with the new URLs.
 * 
 * Usage:
 * 1. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env.local
 * 2. Run: node --env-file=.env.local scripts/migrate-to-cloudinary.mjs
 */

import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');

// Configuration
const {
  MONGODB_URI,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('❌ Cloudinary configuration is missing in environment variables.');
  console.error('Values:', { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY: CLOUDINARY_API_KEY ? 'Set' : 'Missing', CLOUDINARY_API_SECRET: CLOUDINARY_API_SECRET ? 'Set' : 'Missing' });
  process.exit(1);
}

console.log('☁️ Cloudinary Config:', { 
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY.substring(0, 4) + '***',
});

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
});

// Model Definitions
const AudioTrackSchema = new mongoose.Schema({
  fileUrl: String,
  albumImage: String,
}, { strict: false });

const BookSchema = new mongoose.Schema({
  pdfUrl: String,
  coverImage: String,
}, { strict: false });

const VideoTrackSchema = new mongoose.Schema({
  videoUrl: String,
  thumbnailUrl: String,
}, { strict: false });

const AudioTrack = mongoose.models.AudioTrack || mongoose.model('AudioTrack', AudioTrackSchema);
const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);
const VideoTrack = mongoose.models.VideoTrack || mongoose.model('VideoTrack', VideoTrackSchema);

async function uploadToCloudinary(localPath, folder, resourceType = 'auto') {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: `spiritual-insights/${folder}`,
      resource_type: resourceType,
      access_mode: 'public',
      type: 'upload'
    });
    console.log(`✅ Uploaded [${resourceType}]: ${localPath} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Failed to upload ${localPath}:`, error.message);
    return null;
  }
}

async function migrate() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    const urlMapping = new Map();

    // 1. Scan and upload files
    const foldersToScan = ['audio', 'books', 'kids/audio', 'kids/coloring', 'kids/stories', 'icons'];

    for (const folder of foldersToScan) {
      const folderPath = path.join(PUBLIC_DIR, folder);
      if (!fs.existsSync(folderPath)) continue;

      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        const localFilePath = path.join(folderPath, file);
        if (fs.statSync(localFilePath).isDirectory()) continue;

        const ext = path.extname(file).toLowerCase();
        if (['.pdf', '.mp3', '.m4a', '.png', '.jpg', '.jpeg'].includes(ext)) {
          // Determine Resource Type
          let resourceType = 'image';
          if (ext === '.pdf') resourceType = 'raw';
          if (['.mp3', '.m4a'].includes(ext)) resourceType = 'video';

          // Normalize the "local URL" used in DB (e.g. /kids/stories/file.pdf)
          const dbLocalPath = `/${path.join(folder, file).replace(/\\/g, '/')}`;
          
          console.log(`🚀 Uploading ${dbLocalPath} as ${resourceType}...`);
          const cloudUrl = await uploadToCloudinary(localFilePath, folder, resourceType);
          if (cloudUrl) {
            urlMapping.set(dbLocalPath, cloudUrl);
          }
        }
      }
    }

    // 2. Update MongoDB documents
    console.log('\n🔄 Updating MongoDB documents with Cloudinary URLs...');

    // Update Books
    const books = await Book.find({});
    for (const book of books) {
      if (urlMapping.has(book.pdfUrl)) {
        book.pdfUrl = urlMapping.get(book.pdfUrl);
        await book.save();
      }
      // Cover images can also be local paths
      if (urlMapping.has(book.coverImage)) {
        book.coverImage = urlMapping.get(book.coverImage);
        await book.save();
      }
    }
    console.log(`✅ Updated ${books.length} books.`);

    // Update Audio
    const tracks = await AudioTrack.find({});
    for (const track of tracks) {
      if (urlMapping.has(track.fileUrl)) {
        track.fileUrl = urlMapping.get(track.fileUrl);
        await track.save();
      }
      if (urlMapping.has(track.albumImage)) {
        track.albumImage = urlMapping.get(track.albumImage);
        await track.save();
      }
    }
    console.log(`✅ Updated ${tracks.length} audio tracks.`);

    // Update Videos
    const videos = await VideoTrack.find({});
    for (const video of videos) {
      if (urlMapping.has(video.thumbnailUrl)) {
        video.thumbnailUrl = urlMapping.get(video.thumbnailUrl);
        await video.save();
      }
    }
    console.log(`✅ Updated ${videos.length} video tracks.`);

    console.log('\n🌟 Migration to Cloudinary Complete! 🌟');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB.');
  }
}

migrate();
