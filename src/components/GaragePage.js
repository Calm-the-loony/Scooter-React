import React, { useState, useEffect } from "react";
import "../style/GaragePage.css";

const GaragePage = () => {
  const [scooters, setScooters] = useState([]);
  const [newScooter, setNewScooter] = useState({ type: "", brand: "", model: "" });
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    // Загружаем список скутеров из localStorage
    const storedScooters = JSON.parse(localStorage.getItem("garage")) || [];
    setScooters(storedScooters);
  }, []);

  const addScooter = () => {
    if (newScooter.type && newScooter.brand && newScooter.model) {
      const updatedScooters = [...scooters, newScooter];
      setScooters(updatedScooters);
      localStorage.setItem("garage", JSON.stringify(updatedScooters));
      setNewScooter({ type: "", brand: "", model: "" });
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  };

  const selectScooter = (index) => {
    setSelectedScooter(scooters[index]);
    // Фильтрация деталей (пример: запрос к API или локальный фильтр)
    const filteredDetails = mockDetails.filter(
      (detail) =>
        detail.type === scooters[index].type &&
        detail.brand === scooters[index].brand
    );
    setDetails(filteredDetails);
  };

  const removeScooter = (index) => {
    const updatedScooters = scooters.filter((_, i) => i !== index);
    setScooters(updatedScooters);
    localStorage.setItem("garage", JSON.stringify(updatedScooters));
    if (selectedScooter === scooters[index]) {
      setSelectedScooter(null);
      setDetails([]);
    }
  };

  // Пример данных деталей (замените на реальные данные)
  const mockDetails = [
    { id: 1, name: "Запчасть 1", type: "Скутер", brand: "Honda" },
    { id: 2, name: "Запчасть 2", type: "Скутер", brand: "Yamaha" },
  ];

  // Популярные бренды и модели
  const popularBrands = ["Honda", "Yamaha", "Suzuki", "Kawasaki", "BMW"];
  const popularModels = ["Dio", "Aerox", "Burgman", "Zuma", "Riva"];

  return (
    <div className="garage-container">
      <div className="garage-header">
        <h2>Ваш гараж</h2>
      </div>
      <div className="garage-content">
        <div className="add-scooter-form">
          <h3>Добавить скутер</h3>
          <div>
            <select
              value={newScooter.type}
              onChange={(e) =>
                setNewScooter({ ...newScooter, type: e.target.value })
              }
            >
              <option value="">Выберите тип</option>
              <option value="Скутер">Скутер</option>
              <option value="Мотоцикл">Мотоцикл</option>
            </select>

            {/* Поле для выбора или ввода бренда */}
            <input
              type="text"
              placeholder="Бренд"
              list="brand-list"
              value={newScooter.brand}
              onChange={(e) =>
                setNewScooter({ ...newScooter, brand: e.target.value })
              }
            />
            <datalist id="brand-list">
              {popularBrands.map((brand, index) => (
                <option key={index} value={brand} />
              ))}
            </datalist>

            {/* Поле для выбора или ввода модели */}
            <input
              type="text"
              placeholder="Модель"
              list="model-list"
              value={newScooter.model}
              onChange={(e) =>
                setNewScooter({ ...newScooter, model: e.target.value })
              }
            />
            <datalist id="model-list">
              {popularModels.map((model, index) => (
                <option key={index} value={model} />
              ))}
            </datalist>

            <button onClick={addScooter}>Добавить</button>
          </div>
        </div>

        <div className="garage-list">
          <h3>Сохраненные скутеры</h3>
          <ul>
            {scooters.length > 0 ? (
              scooters.map((scooter, index) => (
                <li key={index}>
                  <button
                    onClick={() => selectScooter(index)}
                    className={
                      selectedScooter === scooter ? "selected" : ""
                    }
                  >
                    {scooter.type} {scooter.brand} {scooter.model}
                  </button>
                  <button
                    className="remove-scooter"
                    onClick={() => removeScooter(index)}
                  >
                    Удалить
                  </button>
                </li>
              ))
            ) : (
              <p>Ваш гараж пуст. Добавьте скутеры.</p>
            )}
          </ul>
        </div>

        {selectedScooter && (
          <div className="garage-details">
            <h3>Детали для {selectedScooter.brand} {selectedScooter.model}</h3>
            {details.length > 0 ? (
              <ul>
                {details.map((detail) => (
                  <li key={detail.id}>{detail.name}</li>
                ))}
              </ul>
            ) : (
              <p>Нет подходящих деталей для выбранного скутера.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GaragePage;
