import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../style/GaragePage.scss";
import products from "../../data/products";
import categories from "../../data/categories";
import ProductApiService from "../../service/api/product/ProductService";
import GarageApiService from "../../service/api/product/GarageService";
import { useDispatch } from "react-redux";
import {exitUser} from "../../state/actions/authAction";

ChartJS.register(ArcElement, Tooltip, Legend);

const ITEMS_PER_PAGE = 4; // Количество карточек на одну страницу

const GaragePage = () => {
  const [scooters, setScooters] = useState([]);
  const [newScooter, setNewScooter] = useState(
    {
     type: null,
     mark: null,
     model: null,
     
     id_moto_type: null,
     id_mark: null,
     id_model: null
    }
  );
  const [selectedScooter, setSelectedScooter] = useState(null);

  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [garage, setGarage] = useState([]);
  const dispatch = useDispatch();

  // Типы транспорта
  const [typeMoto, setTypeMoto] = useState([]);

  // Марки (Транспорт)
  const [marks, setMarks] = useState([]);

  // Модели (Транспорт)
  const [models, setModels] = useState([]);

  // Бренды (Транспорт)
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const reqTypeMoto = async () => {
      let allTypeModels = await ProductApiService.allTypeModels();
      if (allTypeModels) {
        setTypeMoto(allTypeModels.moto_types);
      }
    }

    const reqMyGarage = async () => {
      let myGarage = await GarageApiService.myGarage();
      if (myGarage) {
        setGarage(myGarage.garage);
      } else {
        dispatch(exitUser());
      }
    }

    const reqBrands = async () => {
      let allBrands = await ProductApiService.allBrands();
      if (allBrands) {
        setBrands(allBrands.brands);
      }
    }

    const reqModels = async () => {
      let allModels = await ProductApiService.allModels();
      if (allModels) {
        setModels(allModels.all_models);
      }
    }

    const reqMarks = async () => {
      let allMarks = await ProductApiService.allMarks();
      if (allMarks) {
        setMarks(allMarks.marks);
      }
    }

    reqTypeMoto();
    reqMyGarage();
    reqBrands();
    reqMarks();
    reqModels();
  }, []);


  const addScooter = async () => {
    if (newScooter.id_moto_type && newScooter.id_model && newScooter.id_mark) {
      const req = await GarageApiService.addedGarage(
        {
          id_model: newScooter.id_model,
          id_moto_type: newScooter.id_moto_type,
          id_mark: newScooter.id_mark
        }
      );
      setNewScooter({ type: null, mark: null, model: null });
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
  const typesCount = garage.reduce((acc, scooter) => {
    acc[scooter.moto_type_data.name_moto_type] = (acc[scooter.moto_type_data.name_moto_type] || 0) + 1;
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
              onChange={(e) => {setNewScooter({ ...newScooter, type: e.target.value, id_moto_type: Number(e.target.options[e.target.options.selectedIndex].id) }); }}
            >
              <option value="">Выберите тип</option>
              {typeMoto.map((tm) => {
                return <option value={tm.name_type} id={tm.id_mt}>{tm.name_type}</option>
              })}
            </select>
            <input
              type="text"
              placeholder="Марка"
              list="mark-list"
              value={newScooter.mark}
              onChange={(e) => setNewScooter({ ...newScooter, mark: e.target.value, id_mark: marks.find((el, index, array) => el.name_mark === e.target.value).id_mark})}
            />
            <datalist id="mark-list">
              {marks.map((mark) => (
                <option key={mark.id_mark} value={mark.name_mark} />
              ))}
            </datalist>
            <input
              type="text"
              placeholder="Модель"
              list="model-list"
              value={newScooter.model}
              onChange={(e) => setNewScooter({ ...newScooter, model: e.target.value, id_model: models.find((el) => el.name_model === e.target.value).id_model })}
            />
            <datalist id="model-list">
              {models.map((model) => (
                <option key={model.id_model} value={model.name_model} />
              ))}
            </datalist>
            <button onClick={addScooter}>Добавить</button>
          </div>
        </div>

        <div className="garage-list">
          <h3>Сохраненные мототранспорты</h3>
          <ul>
            {garage.length > 0 ? (
              garage.map((scooter, index) => (
                <li key={index}>
                  <button
                    onClick={() => selectScooter(index)}
                    className={selectedScooter === scooter ? "selected" : ""}
                  >
                    {scooter.moto_type_data.name_moto_type} {scooter.models_data.name_model} {scooter.mark_data.name_mark}
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
