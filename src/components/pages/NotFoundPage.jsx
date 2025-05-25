import React from "react";
import "../../style/NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="emoji">😕</div>
        <h1 className="title">404 — Страница не найдена</h1>
        <p className="description">
          Возможно, страница была удалена или никогда не существовала.
        </p>
        <a href="/" className="back-button">На главную</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
