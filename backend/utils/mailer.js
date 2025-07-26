// utils/mailer.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: '932083001@smtp-brevo.com',
    pass: 'M7bNgAEwj4pXPH9a',
  },
});

// ФЕЙКОВАЯ версія: просто виводимо в консоль
async function sendMail(to, subject, html) {
  console.log('👉 Псевдолист надіслано:');
  console.log('📬 To:', to);
  console.log('📝 Subject:', subject);
  console.log('🔗 HTML:', html);
}

module.exports = sendMail;
