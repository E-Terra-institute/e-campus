const sendMail = require('./utils/mailer');

sendMail('maksimignatenkohome@gmail.com', 'Тест E-TERRA', '<h2>Привіт! Це тестовий лист</h2>')
  .then(() => console.log('✅ Лист надіслано'))
  .catch(err => console.error('❌ Помилка відправки:', err));
