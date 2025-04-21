import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/styles.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/verify-code');
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Регистрация</h1>

        <form onSubmit={handleRegister} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">Зарегистрироваться</button>
        </form>

        <div className="register-text">
          Уже есть аккаунт?{" "}
          <span onClick={handleNavigateToLogin} className="link-register">
            Войти
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
