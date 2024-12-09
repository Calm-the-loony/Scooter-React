import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.scss';

const RegisterPage = () => {
  const [role, setRole] = useState('user'); // Роль по умолчанию - обычный пользователь
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = { name, email, password, role, orders: [] };
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem('userData', JSON.stringify(newUser));

    // Сохраняем роль и статус авторизации
    localStorage.setItem('isAuthenticated', 'true');
    if (role === 'admin') {
      localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.setItem('isAdmin', 'false');
    }

    navigate('/account');
  };

  return (
    <div className="register-page">
      <h1>Регистрация</h1>
      <form onSubmit={handleRegister}>
        <label>
          Имя:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Роль:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
        </label>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
