/**
 * MongoDB Seeding Script for Spiritual Insights (Full V2)
 * This script migrates ALL 19 PDFs, 13 Audios, and Videos into MongoDB Atlas.
 * 
 * Usage:
 * node --env-file=.env.local scripts/seed-mongodb.mjs
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in your environment variables.');
  process.exit(1);
}

// Model Definitions
const AudioTrackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  category: String,
  description: String,
  fileUrl: String,
  duration: Number,
  albumImage: String,
  deity: String,
}, { timestamps: true, strict: false });

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  description: String,
  pdfUrl: String,
  coverImage: String,
  deity: String,
}, { timestamps: true, strict: false });

const VideoTrackSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  duration: Number,
  deity: String,
}, { timestamps: true, strict: false });

const AudioTrack = mongoose.models.AudioTrack || mongoose.model('AudioTrack', AudioTrackSchema);
const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);
const VideoTrack = mongoose.models.VideoTrack || mongoose.model('VideoTrack', VideoTrackSchema);

const AUDIO_DATA = [
  // Spiritual Audio (10)
  { title: 'Bappa Morya', artist: 'Traditional', category: 'Bhajans', fileUrl: '/audio/Bappa-Morya.mp3', duration: 300, albumImage: '🐘' },
  { title: 'Deep Sleep Meditation', artist: 'Zen Master', category: 'Meditation', fileUrl: '/audio/Deep-Sleep-Meditation.mp3', duration: 1800, albumImage: '🧘' },
  { title: 'Gayatri Mantra', artist: 'Pandit Jasraj', category: 'Mantras', fileUrl: '/audio/Gaytri-Mantra.mp3', duration: 420, albumImage: '☀️' },
  { title: 'Jai Ganesh Jai Ganesh', artist: 'Anuradha Paudwal', category: 'Bhajans', fileUrl: '/audio/Jai-Ganesh.mp3', duration: 312, albumImage: '🐘' },
  { title: 'Jai Siya Ram', artist: 'Traditional', category: 'Bhajans', fileUrl: '/audio/Jai-siya-ram.mp3', duration: 400, albumImage: '🏹' },
  { title: 'Krishanaya Vasudevaya', artist: 'Deva Premal', category: 'Mantras', fileUrl: '/audio/Krishanaya-Vasudevaya.mp3', duration: 360, albumImage: '🦚' },
  { title: 'Mahamrityunjaya Mantra', artist: 'Traditional', category: 'Mantras', fileUrl: '/audio/Mahamritunjay-Mantra.mp3', duration: 600, albumImage: '🌺' },
  { title: 'Morning Meditation', artist: 'Sri M', category: 'Meditation', fileUrl: 'https://res.cloudinary.com/ds0dcrajq/video/upload/v1774330378/spiritual-insights/audio/brt3x0mdxxuvfeigq5j1.mp3', duration: 900, albumImage: '🧘' },
  { title: 'Om Namah Shivaya', artist: 'Traditional', category: 'Mantras', fileUrl: '/audio/Om-Namah-Shivaay.mp3', duration: 600, albumImage: '🕉️' },
  { title: 'Ram Bhajan', artist: 'Traditional', category: 'Bhajans', fileUrl: 'https://res.cloudinary.com/ds0dcrajq/video/upload/v1774330278/spiritual-insights/audio/bhxdnqajrufmfjfvfzsq.mp3', duration: 450, albumImage: '🏹' },
  
  // Kids Audio (3) - Total 13
  { title: 'Little Krishna\'s Butter Theft', artist: 'Kids Tales', category: 'Kids Audio', fileUrl: '/kids/audio/Krishna-Butter-theft.m4a', duration: 194, albumImage: '🧈', deity: 'krishna' },
  { title: 'How Ganesha Got His Elephant Head', artist: 'Kids Tales', category: 'Kids Audio', fileUrl: '/kids/audio/Ganesha-elephen-head-story.m4a', duration: 164, albumImage: '🐘', deity: 'ganesha' },
  { title: 'Hanuman\'s Devotion to Rama', artist: 'Kids Tales', category: 'Kids Audio', fileUrl: '/kids/audio/Hanuman-devotion-story.m4a', duration: 227, albumImage: '🐒', deity: 'hanuman' },
];

const BOOKS_DATA = [
  // Spiritual Books (8)
  { title: 'Bhagavad Gita', author: 'Vyasa', category: 'Spiritual Books', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774332952/spiritual-insights/books/crzou6b1azr88ksyqqho.pdf', coverImage: '📘' },
  { title: 'Hanuman Stories', author: 'Traditional', category: 'Spiritual Books', pdfUrl: '/books/Hanuman stories.pdf', coverImage: '🐒' },
  { title: 'Hindu Gods Colouring Book', author: 'Art Collection', category: 'Spiritual Books', pdfUrl: '/books/Hindu-gods-colouring-book.pdf', coverImage: '🖍️' },
  { title: 'Krishna Book', author: 'A.C. Bhaktivedanta', category: 'Spiritual Books', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774330418/spiritual-insights/books/fdat64nej8ukkbezjq1m.pdf', coverImage: '🦚' },
  { title: 'Complete Mahabharata Vol 1', author: 'Ramesh Menon', category: 'Spiritual Books', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774330427/spiritual-insights/books/syom0vayi8hvrmsmyfc7.pdf', coverImage: '📗' },
  { title: 'Panchatantra', author: 'Vishnu Sharma', category: 'Spiritual Books', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774330408/spiritual-insights/books/dvvm7k6liovflhin90eq.pdf', coverImage: '🦊' },
  { title: 'Ram Charit Manas', author: 'Tulsidas', category: 'Spiritual Books', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774332963/spiritual-insights/books/za4aoo9fr3dcdduygqgz.pdf', coverImage: '🏹' },
  { title: 'Ganesh Coloring Page', author: 'Art Collection', category: 'Spiritual Books', pdfUrl: '/books/Ganesh-Coloring-Page.pdf', coverImage: '🐘' },

  // Kids Stories (5)
  { title: 'The Childhood of Krishna', author: 'Traditional', category: 'Kids Books', deity: 'krishna', coverImage: '🦚', description: 'Read about the miraculous birth and early adventures of Lord Krishna.', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774333012/spiritual-insights/kids/stories/ckmh12jmrzlurxnq5wom.pdf' },
  { title: 'Krishna and the Govardhan Hill', author: 'Traditional', category: 'Kids Books', deity: 'krishna', coverImage: '⛰️', description: 'How little Krishna lifted a mountain to save the villagers.', pdfUrl: '/kids/stories/Krishana and the Govardhan hill.pdf' },
  { title: 'The Birth of Lord Rama', author: 'Traditional', category: 'Kids Books', deity: 'rama', coverImage: '🏹', description: 'The joyous arrival of Lord Rama in Ayodhya.', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774333016/spiritual-insights/kids/stories/kv53u8aeysakrjqmdojo.pdf' },
  { title: 'Hanuman\'s Leap to the Sun', author: 'Traditional', category: 'Kids Books', deity: 'hanuman', coverImage: '🥭', description: 'The story of baby Hanuman mistaking the sun for a sweet mango.', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774333008/spiritual-insights/kids/stories/qwrkv4z44ntb996ksqh9.pdf' },
  { title: 'Ganesha and the Mango', author: 'Traditional', category: 'Kids Books', deity: 'ganesha', coverImage: '🐘', description: 'How Ganesha won the ultimate race around the universe.', pdfUrl: '/kids/stories/Ganesha and the Golden .pdf' },
  
  // Coloring Pages (6) - Total 19
  { title: 'Baby Ganesha', author: 'Art Collection', category: 'Coloring Books', coverImage: '🐘', pdfUrl: '/kids/coloring/Ganesh-Coloring-Page.pdf' },
  { title: 'Peacock Feather', author: 'Art Collection', category: 'Coloring Books', coverImage: '🦚', pdfUrl: '/kids/coloring/Peacock feather.pdf' },
  { title: 'Om Symbol Mandala', author: 'Art Collection', category: 'Coloring Books', coverImage: '🕉️', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774330434/spiritual-insights/kids/coloring/ysnkkoskceqfxuh55aas.pdf' },
  { title: 'Diya (Lamp)', author: 'Art Collection', category: 'Coloring Books', coverImage: '🪔', pdfUrl: '/kids/coloring/diya.pdf' },
  { title: 'Lotus Flower', author: 'Art Collection', category: 'Coloring Books', coverImage: '🪷', pdfUrl: '/kids/coloring/lotus.pdf' },
  { title: 'Bow and Arrow', author: 'Art Collection', category: 'Coloring Books', coverImage: '🏹', pdfUrl: 'https://res.cloudinary.com/ds0dcrajq/image/upload/v1774330440/spiritual-insights/kids/coloring/lrkzgairyb9mct3f9ras.pdf' },
];

const VIDEO_DATA = [
  // Spiritual Shorts
  { title: 'The Story of Lord Shiva', category: 'Spiritual Shorts', videoUrl: 'https://www.youtube.com/embed/tdndYtihdW4', thumbnailUrl: '🕉️', duration: 510, deity: 'shiva' },
  { title: "Hanuman's Devotion", category: 'Spiritual Shorts', videoUrl: 'https://www.youtube.com/embed/U6eylMFG-s8', thumbnailUrl: '🐒', duration: 405, deity: 'hanuman' },
  
  // Kids Stories
  { title: 'Krishna and Sudama', category: 'Kids Stories', videoUrl: 'https://www.youtube.com/embed/GswFpI4_mQc', thumbnailUrl: '🤝', description: 'A beautiful story of friendship.', duration: 720 },
  { title: 'Prahlad and Holika', category: 'Kids Stories', videoUrl: 'https://www.youtube.com/embed/U6eylMFG-s8', thumbnailUrl: '🔥', description: 'The brave little devotee of Vishnu.', duration: 600 },
  { title: 'Krishna defeats Kaliya', category: 'Kids Stories', videoUrl: 'https://www.youtube.com/embed/oYh_FeZ67pM', thumbnailUrl: '🐍', description: 'Krishna dances on the multi-headed serpent.', duration: 500 },
  { title: "Ganesha's Wisdom Tales", category: 'Kids Stories', videoUrl: 'https://www.youtube.com/embed/8Dlnw2FuqA4', thumbnailUrl: '🐘', description: 'Stories of Lord Ganesha.', duration: 560 },

  // Festival Specials
  { title: 'Diwali Celebration Guide', category: 'Festival Specials', videoUrl: 'https://www.youtube.com/embed/62e0h_T1X74', thumbnailUrl: '🪔', description: 'Learn the history and rituals of Diwali.', duration: 900 },
  { title: 'Holi — Festival of Colors', category: 'Festival Specials', videoUrl: 'https://www.youtube.com/embed/sU14zLh_gX0', thumbnailUrl: '🎨', description: 'The vibrant story and joy of Holi.', duration: 1080 },

  // Temple Docs
  { title: 'Varanasi Temple Tour', category: 'Temple Docs', videoUrl: 'https://www.youtube.com/embed/Brv9gRYyJCA', thumbnailUrl: '🕍', description: 'A journey through the holy city of Varanasi.', duration: 1320 },
  { title: 'Tirupati Balaji Documentary', category: 'Temple Docs', videoUrl: 'https://www.youtube.com/embed/q0L-g9-yGq8', thumbnailUrl: '🏯', description: 'The miracles and history of Tirumala.', duration: 2100 },
];

async function seed() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully.');

    await AudioTrack.deleteMany({});
    await AudioTrack.insertMany(AUDIO_DATA);
    console.log(`✅ Seeded ${AUDIO_DATA.length} audio tracks.`);

    await Book.deleteMany({});
    await Book.insertMany(BOOKS_DATA);
    console.log(`✅ Seeded ${BOOKS_DATA.length} books.`);

    await VideoTrack.deleteMany({});
    await VideoTrack.insertMany(VIDEO_DATA);
    console.log(`✅ Seeded ${VIDEO_DATA.length} videos.`);

    console.log('\n🌟 MongoDB Seeding Complete (All 13 Audios & 19 PDFs)! 🌟');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB.');
  }
}

seed();
