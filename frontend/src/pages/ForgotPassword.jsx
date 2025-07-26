import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://psychic-xylophone-r4wvgwr6vqv52xpx9-5000.app.github.dev/api/auth/forgot-password',
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Помилка при надсиланні');
    }
  };

  return (
    <div>
      <h2>Відновлення пароля</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Введіть email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Надіслати посилання</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
