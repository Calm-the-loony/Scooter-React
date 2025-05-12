import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../service/api/auth/AuthApiService";
import "../../style/styles.scss";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setErrorMessage("Вы должны принять условия пользовательского соглашения и политики конфиденциальности");
      return;
    }

    const dateNow = new Date();

    AuthService.registerUser({
      email_user: email,
      password_user: password,
      name_user: "User",
      main_name_user: "User",
      date_registration:
        dateNow.getFullYear() +
        "-" +
        (dateNow.getMonth() < 10
          ? "0" + dateNow.getMonth()
          : dateNow.getMonth()) +
        "-" +
        (dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate()),
    })
      .then(() => {
        localStorage.setItem("email-registration", email);
        navigate("/verify-code");
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(
          "Не удалось создать аккаунт, возможно данная почта уже занята",
        );
      });
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
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

          <div className="terms-container">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span>
                Я принимаю{" "}
                <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>
                  пользовательское соглашение
                </button>{" "}
                и{" "}
                <button type="button" className="terms-link" onClick={() => setShowPrivacy(true)}>
                  политику конфиденциальности
                </button>
              </span>
            </label>
          </div>

          <button type="submit" className="btn-login" disabled={!acceptedTerms}>
            Зарегистрироваться
          </button>
        </form>
        {errorMessage.length > 0 ? (
          <div className="error">
            <p>{errorMessage}</p>
          </div>
        ) : (
          ""
        )}

        <div className="register-text">
          Уже есть аккаунт?{" "}
          <span onClick={handleNavigateToLogin} className="link-register">
            Войти
          </span>
        </div>
      </div>

      {/* Модальные окна с документами */}
      {showTerms && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Пользовательское соглашение</h2>
            </div>
            <div className="modal-body">
              <h3>1. Общие положения</h3>
              <p>
                1.1. Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между владельцем данного сервиса (далее — Администрация) и пользователем (далее — Пользователь) при использовании сервиса.
              </p>
              <p>
                1.2. Используя сервис, Пользователь соглашается с условиями данного Соглашения.
              </p>
              
              <h3>2. Права и обязанности сторон</h3>
              <p>
                2.1. Администрация обязуется предоставлять доступ к сервису в соответствии с его функциональными возможностями.
              </p>
              <p>
                2.2. Пользователь обязуется использовать сервис только в законных целях.
              </p>
              
              <h3>3. Ответственность</h3>
              <p>
                3.1. Администрация не несет ответственности за невозможность использования сервиса по независящим от нее причинам.
              </p>
              
              <h3>4. Заключительные положения</h3>
              <p>
                4.1. Администрация оставляет за собой право вносить изменения в настоящее Соглашение.
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={() => setShowTerms(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Политика конфиденциальности</h2>
            </div>
            <div className="modal-body">
              <h3>1. Общие положения</h3>
              <p>
                1.1. Настоящая Политика конфиденциальности регулирует порядок сбора, хранения, передачи и использования персональных данных пользователей.
              </p>
              
              <h3>2. Собираемая информация</h3>
              <p>
                2.1. При регистрации мы собираем ваш email и пароль (в зашифрованном виде).
              </p>
              <p>
                2.2. Мы можем собирать техническую информацию о вашем устройстве и поведении в сервисе.
              </p>
              
              <h3>3. Использование информации</h3>
              <p>
                3.1. Ваши данные используются для предоставления услуг сервиса, улучшения его работы и обеспечения безопасности.
              </p>
              
              <h3>4. Защита данных</h3>
              <p>
                4.1. Мы предпринимаем все необходимые меры для защиты ваших персональных данных.
              </p>
              
              <h3>5. Передача данных третьим лицам</h3>
              <p>
                5.1. Мы не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={() => setShowPrivacy(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;