// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const webhookRoutes = require('./src/routes/webhook');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Ayarları (Frontend URL'sini buraya ekleyin)
app.use(cors({
  origin: 'https://kargodeposu-frontend.herokuapp.com',
  credentials: true,
}));

app.use(bodyParser.json());

// Rotaları Kullan
app.use('/auth', authRoutes);
app.use('/webhook', webhookRoutes);

// Ana Sayfa
app.get('/', (req, res) => {
  res.send('KargoDeposu Backend');
});

// Sunucuyu Başlat
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
