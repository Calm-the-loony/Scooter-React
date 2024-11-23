import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

const LoginPage = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const storedUser = JSON.parse(localStorage.getItem('userData'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            localStorage.setItem('isAuthenticated', 'true');
            setMessage('Авторизация успешна.');
            setTimeout(() => navigate('/account'), 1000);
        } else {
            setMessage('Неверный логин или пароль.');
        }
    };

    return (
      <div className="login-form form-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="email" type="email" placeholder="Электронная почта" required className="form-input" />
        <input name="password" type="password" placeholder="Пароль" required className="form-input" />
        <button type="submit" className="form-btn">Войти</button>
      </form>
      {message && <p className={`message ${message.includes('успешна') ? 'success-message' : 'error-message'}`}>{message}</p>}
      <p>У вас нет аккаунта? <a href="/register" className="link-btn">Зарегистрироваться</a></p>
    </div>
    );
};

export default LoginPage;
