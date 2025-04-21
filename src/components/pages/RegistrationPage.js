import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../service/api/auth/AuthApiService';
import '../../style/styles.scss';

const RegisterPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const dateNow = new Date();

    AuthService.registerUser({
      email_user: email,
      password_user: password,
      name_user: "User",
      main_name_user: "User",
      date_registration: dateNow.getFullYear() + "-" + (dateNow.getMonth() < 10 ? "0" + dateNow.getMonth() : dateNow.getMonth()) + "-" + (dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate())
    }).then(() => {
      localStorage.setItem("email-registration", email);
      navigate('/verify-code');
    }).catch((e) => {console.log(e); setErrorMessage("Не удалось создать аккаунт, возможно данная почта уже занята")});
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
        {errorMessage.length > 0 ?
          <div>
            <p>{errorMessage}</p>
          </div>
          :
          ""
        }

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
