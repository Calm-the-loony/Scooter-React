import { useNavigate } from "react-router-dom";

import DesigneImage from "../../image/Дизайн.png";
import "../../style/NotFound.scss";

export default function NotFoundProducts({ text }) {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <img className="not-found-image" src={DesigneImage} alt="Логотип Scooter24" />
        <h1 className="title">{text || "Не удалось найти товары"}</h1>
        <p className="description">
          Попробуйте изменить параметры поиска или вернуться на главную страницу.
        </p>
        <button className="back-button" onClick={() => navigate("/")}>
          На главную
        </button>
      </div>
    </div>
  );
}
