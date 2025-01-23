import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/styles.scss';
import { AuthService } from '../../service/api/auth/AuthApiService';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
      
      let req = AuthService.loginUser(email, password).then((message) => {
        // Устанавливаем флаг авторизации и роль пользователя
        localStorage.setItem('isAuthenticated', 'true');
        // localStorage.setItem('isAdmin', storedUser.role === 'admin' ? 'true' : 'false');
        navigate('/account');
      }).catch((er) => {
        console.log(er);
        alert("Неверные данные для входа");
      });
  };

  return (
    <div className="login-page">
      <h1>Авторизация</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
