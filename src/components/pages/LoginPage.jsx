import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/styles.scss";
import { AuthService } from "../../service/api/auth/AuthApiService";
import { useDispatch } from "react-redux";
import { loginUser } from "../../state/actions/authAction";
import {UserApiService} from "../../service/api/user/UserApiService";
import {setUserInfo} from "../../state/actions/userAction";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    AuthService.loginUser(email, password)
      .then(() => {
        dispatch(loginUser());

        // Получаем данные о пользователе
        UserApiService.informationAboutUser().then((data) => {
          dispatch(setUserInfo(data));
        });

        navigate("/account");
      })
      .catch(() => {
        setError("Неверные данные для входа или ошибка соединения");
      });
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Вход в аккаунт</h1>

        <form onSubmit={handleLogin} className="login-form">
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

          <button type="submit" className="btn-login">
            Войти
          </button>
        </form>
        {error.length > 0 ? <div className="error">{error}</div> : ""}
        <div></div>
        <div className="register-text">
          Нет аккаунта?{" "}
          <span onClick={handleNavigateToRegister} className="link-register">
            Зарегистрироваться
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
