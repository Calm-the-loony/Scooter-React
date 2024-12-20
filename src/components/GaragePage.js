import React, { useState, useEffect } from "react";
import "../style/GaragePage.scss";
import products from "../data/products";
import categories from "../data/categories";

const ITEMS_PER_PAGE = 4; // Количество карточек на одну страницу

const GaragePage = () => {
  const [scooters, setScooters] = useState([]);
  const [newScooter, setNewScooter] = useState({ type: "", brand: "", model: "" });
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
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
    const selected = scooters[index];
    if (selectedScooter === selected) {
      // Если скутер уже выбран, то скрываем детали
      setSelectedScooter(null);
      setDetails([]);
    } else {
      setSelectedScooter(selected);
      updateDetails(selected);
      setCurrentPage(1); // Сбрасываем страницу на первую при выборе нового скутера
    }
  };

  const updateDetails = (scooter) => {
    // Проверка на undefined перед использованием toLowerCase
    const scooterType = scooter.type?.toLowerCase() || "";
    const scooterBrand = scooter.brand?.toLowerCase() || "";
    const scooterModel = scooter.model?.toLowerCase() || "";

    // Фильтрация товаров из 'products' массива
    const productDetails = products.filter(
      (product) =>
        (product.type?.toLowerCase() || "").includes(scooterType) &&
        (product.brand?.toLowerCase() || "").includes(scooterBrand) &&
        (product.model?.toLowerCase() || "").includes(scooterModel)
    );

    // Фильтрация товаров из 'categories' массива
    const categoryDetails = categories.flatMap((category) =>
      category.subcategories.flatMap((subcategory) =>
        (subcategory.products || []).filter(
          (product) =>
            (product.type?.toLowerCase() || "").includes(scooterType) &&
            (product.brand?.toLowerCase() || "").includes(scooterBrand) &&
            (product.model?.toLowerCase() || "").includes(scooterModel)
        )
      )
    );

    // Объединяем детали товаров, чтобы избежать дублирования
    const combinedDetails = [
      ...productDetails,
      ...categoryDetails.filter(
        (detail) => !productDetails.some((pd) => pd.id === detail.id)
      ),
    ];

    setDetails(combinedDetails);
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

  const totalPages = Math.ceil(details.length / ITEMS_PER_PAGE);
  const paginatedDetails = details.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              onChange={(e) => setNewScooter({ ...newScooter, type: e.target.value })}
            >
              <option value="">Выберите тип</option>
              <option value="Скутер">Скутер</option>
              <option value="Мотоцикл">Мотоцикл</option>
            </select>
            <input
              type="text"
              placeholder="Бренд"
              list="brand-list"
              value={newScooter.brand}
              onChange={(e) => setNewScooter({ ...newScooter, brand: e.target.value })}
            />
            <datalist id="brand-list">
              {["Honda", "Yamaha", "Suzuki", "Kawasaki", "BMW"].map((brand, index) => (
                <option key={index} value={brand} />
              ))}
            </datalist>
            <input
              type="text"
              placeholder="Модель"
              list="model-list"
              value={newScooter.model}
              onChange={(e) => setNewScooter({ ...newScooter, model: e.target.value })}
            />
            <datalist id="model-list">
              {["Dio", "Aerox", "Burgman", "Zuma", "Riva"].map((model, index) => (
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
                    className={selectedScooter === scooter ? "selected" : ""}
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
            <h3>
              Детали для {selectedScooter.brand} {selectedScooter.model}
            </h3>
            {details.length > 0 ? (
              <>
                <ul className="products-grid">
                  {paginatedDetails.map((detail) => (
                    <li key={detail.id}>
                      <div className="products-card">
                        <img src={detail.image} alt={detail.name} />
                        <h4>{detail.name}</h4>
                        <p>Цена: {detail.price}</p>
                        <p>В наличии: {detail.stock}</p>
                        <p>Артикул: {detail.article}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-button ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
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
