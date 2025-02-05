import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/styles.scss';
import { AuthService } from '../../service/api/auth/AuthApiService';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../state/actions/authAction';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const handleLogin = (e) => {
    e.preventDefault();
      
      AuthService.loginUser(email, password).then((message) => {

        // Устанавливаем флаг авторизации
        dispatch(loginUser());

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
