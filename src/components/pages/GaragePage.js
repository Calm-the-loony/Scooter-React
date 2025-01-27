import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../style/GaragePage.scss";
import products from "../../data/products";
import categories from "../../data/categories";
import ProductApiService from "../../service/api/product/ProductService";

ChartJS.register(ArcElement, Tooltip, Legend);

const ITEMS_PER_PAGE = 4; // Количество карточек на одну страницу

const GaragePage = () => {
  const [scooters, setScooters] = useState([]);
  const [newScooter, setNewScooter] = useState({ type: null, brand: null, model: null });
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Типы транспорта
  const [typeMoto, setTypeMoto] = useState([]);

  useEffect(() => {
    let req = async () => {
      let allTypeModels = await ProductApiService.allTypeModels();
      if (allTypeModels) {
        setTypeMoto(allTypeModels.moto_types);
      }
    }

    req();
  }, []);


  const addScooter = () => {
    console.log(newScooter);
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
      setSelectedScooter(null);
      setDetails([]);
    } else {
      setSelectedScooter(selected);
      updateDetails(selected);
      setCurrentPage(1);
    }
  };

  const updateDetails = (scooter) => {
    const scooterType = scooter.type?.toLowerCase() || "";
    const scooterBrand = scooter.brand?.toLowerCase() || "";
    const scooterModel = scooter.model?.toLowerCase() || "";

    const productDetails = products.filter(
      (product) =>
        (product.type?.toLowerCase() || "").includes(scooterType) &&
        (product.brand?.toLowerCase() || "").includes(scooterBrand) &&
        (product.model?.toLowerCase() || "").includes(scooterModel)
    );

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

  // Данные для диаграммы
  const typesCount = scooters.reduce((acc, scooter) => {
    acc[scooter.type] = (acc[scooter.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(typesCount),
    datasets: [
      {
        data: Object.values(typesCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
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
              {typeMoto.map((tm) => {
                return <option value={tm.name_type} id={tm.id_mt}>{tm.name_type}</option>
              })}
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

        <div className="garage-details">
          <h3>Статистика транспорта в гараже</h3>
          {Object.keys(typesCount).length > 0 ? (
            <Pie data={chartData} />
          ) : (
            <p>В гараже пока нет данных для визуализации.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GaragePage;
