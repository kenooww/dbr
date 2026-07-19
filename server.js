// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./config/db');

// const authRoutes = require('./routes/auth');
// const roomRoutes = require('./routes/rooms');
// const userRoutes = require('./routes/users');

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded room images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/users', userRoutes);

// // Serve the public website + admin dashboard
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Basic error handler (e.g. multer file errors)
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ message: err.message || 'Something went wrong.' });
// });

// const PORT = process.env.PORT || 5000;

// if (process.env.VERCEL !== '1') {
//   app.listen(PORT, () => console.log(`Amihan Cove Resort server running on http://localhost:${PORT}`));
// }

// module.exports = app;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const userRoutes = require('./routes/users');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Room photos are stored on Cloudinary now (see utils/upload.js), so no local
// /uploads static route is needed - Cloudinary URLs are used directly.

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);

// Serve the public website + admin dashboard
app.use(express.static(path.join(__dirname, 'public')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Basic error handler (e.g. multer file errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Amihan Cove Resort server running on http://localhost:${PORT}`));

