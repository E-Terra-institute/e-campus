const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendMail = require('../utils/mailer');
const User = require('../models/User');

// Допустимые инвайт-коды
const allowedInviteCodes = ['ETERRA2024', 'MOON2025', 'E-CAMPUS'];

// 🔐 Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, inviteCode } = req.body;

    if (!allowedInviteCodes.includes(inviteCode)) {
      return res.status(403).json({ message: 'Недійсний інвайт-код' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, inviteCode });
    await newUser.save();

    res.status(201).json({ message: 'Реєстрація успішна!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// 🔐 Логін
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний пароль' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'секретний_ключ', // вынесем позже в .env
      { expiresIn: '7d' }
    );

    res.json({ token, message: 'Вхід успішний' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// 🔁 Запит на відновлення пароля
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000; // 1 година
  await user.save();

  const resetLink = `http://localhost:3000/reset-password/${token}`;

  // 🧪 Замість реального листа — лог в консоль
  console.log(`👉 Лінк для скидання пароля: ${resetLink}`);

  res.json({ message: 'Лист (умовно) надіслано. Перевір консоль.' });
});

// 🔁 Зміна пароля через токен
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Недійсний або протермінований токен' });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.json({ message: 'Пароль оновлено' });
});


module.exports = router;
