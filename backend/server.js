const express = require('express');
const cors = require('cors');
const app = express();

// ✅ додай CORS-політику
app.use(cors({
  origin: 'https://psychic-xylophone-r4wvgwr6vqv52xpx9-3000.app.github.dev',
  credentials: true
}));

// інші middleware
app.use(express.json());

// твої маршрути
app.use('/api/auth', require('./routes/auth'));

// старт сервера
app.listen(5000, () => {
  console.log('Сервер запущено на порту 5000');
});
