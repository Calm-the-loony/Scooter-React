import { useNavigate } from "react-router-dom";

import DesigneImage from "../../image/Дизайн.png";
import "../../style/NotFound.scss";

export default function NotFoundProducts() {

    const navigate = useNavigate();

    return (
        <div className="notFound">
            <img 
                src={DesigneImage}
                alt="Логотип Scooter24"
            />
            <p>Не удалось найти товары</p>
            <button onClick={() => navigate('/')}>На главную</button>
        </div>
    )
}