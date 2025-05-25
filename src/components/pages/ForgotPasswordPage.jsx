import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/styles.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Пароль должен содержать минимум 6 символов");
      return;
    }

    // ❗ Сохраняем данные в localStorage и переходим без запроса к backend
    localStorage.setItem("email-for-reset", email);
    localStorage.setItem("new-password", newPassword);
    navigate("/verify-reset-code");
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-page forgot-password-page">
      <div className="login-card">
        <h1 className="login-title">Восстановление пароля</h1>

        <p className="reset-instructions">
          Введите email и новый пароль. Мы отправим код подтверждения на вашу почту.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
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
            <label htmlFor="newPassword">Новый пароль</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Отправить код подтверждения
          </button>
        </form>

        {errorMessage.length > 0 && (
          <div className="error">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="register-text">
          Вспомнили пароль?{" "}
          <span onClick={handleNavigateToLogin} className="link-register">
            Войти
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
