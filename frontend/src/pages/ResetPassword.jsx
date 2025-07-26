// src/pages/ResetPassword.jsx

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message || 'Пароль оновлено');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Помилка скидання');
    }
  };

  return (
    <div>
      <h2>Скидання пароля</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Новий пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Оновити пароль</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
