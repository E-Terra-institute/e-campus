// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected'); // ⬅️ ВГОРІ

const app = express();

mongoose.connect('mongodb+srv://maksimignatenkohome:7eB3VVMg08DKYi73@cluster0.tspwnkg.mongodb.net/e-campus?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Підключено до MongoDB'))
  .catch(err => console.error('❌ Помилка підключення до MongoDB:', err));

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes); // ⬅️ ДО listen()

app.get('/', (req, res) => {
  res.send('Привіт з бекенда E-Кампуса!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
