import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/ErrorPage.scss';

const ErrorPage = ({ errorType = "server" }) => {
  const errorMessages = {
    server: {
      title: "Ой, что-то пошло не так!",
      description: "Наши серверы временно недоступны. Мы уже решаем эту проблему.",
      emoji: "😟"
    },
    maintenance: {
      title: "Мы скоро вернемся!",
      description: "Сайт временно на техническом обслуживании. Приносим извинения за неудобства.",
      emoji: "🔧"
    },
    payment: {
      title: "Ошибка оплаты",
      description: "Во время обработки платежа произошла ошибка. Попробуйте снова или используйте другой метод.",
      emoji: "💳"
    },
    default: {
      title: "Произошла ошибка",
      description: "Попробуйте обновить страницу или вернуться позже.",
      emoji: "🤔"
    }
  };

  const { title, description, emoji } = errorMessages[errorType] || errorMessages.default;

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-emoji">{emoji}</div>
        <h1 className="error-title">{title}</h1>
        <p className="error-description">{description}</p>

        <div className="error-actions">
          <button className="error-button" onClick={() => window.location.reload()}>
            Обновить
          </button>
          <Link to="/" className="error-button home-button">
            На главную
          </Link>
        </div>

        <div className="error-footer">
          <p>Если проблема сохраняется, напишите нам:</p>
          <a href="mailto:support@example.com" className="error-contact">support@example.com</a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
