# Spiritual Insights 🕉️

Spiritual Insights is a modern, calm, and interactive web application designed to be your daily spiritual companion. Built as a Progressive Web App (PWA) using Next.js, it offers a serene digital environment for devotional content, guided meditation, and personal tracking.

## ✨ Features

- **Digital Jap Mala**: An interactive digital rosary to track your mantra recitations and completed malas.
- **AI Spiritual Guide**: Ask questions about mantras, mythology, meditation, and philosophy, powered by Google Gemini AI with intelligent fallbacks.
- **Audio & Video Libraries**: Explore curated devotional audio and video content.
- **Kids Zone**: A safe, engaging space with animations, coloring books, audio, and spiritual stories tailored for children.
- **Multi-language Support (i18n)**: Experience the platform in multiple languages (English, Hindi, Marathi), with immediate language switching.
- **Authentication**: Seamless and secure Google OAuth sign-in via NextAuth.
- **User Profiles**: Track your Jap Mala sessions, view your reciting history, and manage your favorite audio tracks.
- **Progressive Web App (PWA)**: Installable on both desktop and mobile devices for a native app-like experience.
- **Dark & Light Themes**: Accessible theme toggling for customized readability.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS for custom animations.
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Media Storage**: [Firebase](https://firebase.google.com/) & [Cloudinary](https://cloudinary.com/)
- **AI Assistant**: Google Gemini API (`@google/genai`)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Internationalization**: `react-i18next`

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Environment Variables

Create a `.env.local` file in the root directory and add the following keys. Make sure to replace the placeholder values with your actual credentials:

```env
# MongoDB Atlas
MONGODB_URI=mongodb://your-mongodb-connection-string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Gemini AI (for the AI Guide)
GEMINI_API_KEY=your-gemini-api-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Spiritual-Insights.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Spiritual-Insights
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 PWA Support

Spiritual Insights is fully configured as a Progressive Web App. In production mode, you will see an "Install App" prompt in supported browsers, allowing you to add it directly to your home screen or desktop.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/Spiritual-Insights/issues).

## 📄 License

This project is licensed under the MIT License.
