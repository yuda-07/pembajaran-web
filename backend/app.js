require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Backend Express berjalan!' });
});

const infoRoutes = require('./routes/infoRoutes');
const auth = require('./middleware/auth');
app.use('/api/info', auth, infoRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const galleryRoutes = require('./routes/galleryRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const directoryRoutes = require('./routes/directoryRoutes');

app.use('/api/gallery', galleryRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/info', infoRoutes);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
}); 