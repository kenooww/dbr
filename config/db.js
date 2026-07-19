const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is missing. Add it in Vercel → Settings → Environment Variables.');
    return; // don't crash the whole function
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    // do NOT process.exit() here - this is a serverless function, not a long-running server
  }
}

module.exports = connectDB;