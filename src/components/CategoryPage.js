import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import categories from "../data/categories";
import ProductCard from "../components/ProductCard"; // Импортируем компонент ProductCard
import "../style/CategoryPage.css";
import CatImage from "../image/free-icon-black-cat-3704886.png";
import shkivyImage from "../image/product/shkivy.webp";

const CategoryPage = () => {
  const location = useLocation(); // Используем хук useLocation для получения данных маршрута
  const initialCategoryId = location.state?.categoryId || null; // Получаем categoryId из state, если он есть

  // Инициализация состояния с учетом переданного categoryId
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", sort: "default" });

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ minPrice: "", maxPrice: "", sort: "default" });
  };

  const filteredProducts = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    if (!category) return [];
    let products = category.products;

    // Фильтрация по цене
    if (filters.minPrice) {
      products = products.filter((product) => parseFloat(product.price) >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      products = products.filter((product) => parseFloat(product.price) <= parseFloat(filters.maxPrice));
    }

    // Сортировка
    switch (filters.sort) {
      case "price-asc":
        products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "availability":
        products.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return products;
  };

  return (
    <main className="containers">
      <aside className="sidebar">
        <nav className="categories-nav">
          <h2>Категории</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <button onClick={() => handleCategoryClick(category.id)} className="category-button">
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="filter-container">
          <h2>Фильтры</h2>
          <div className="filter">
            <label>Цена:</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Мин"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Макс"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter">
            <label>Сортировать по:</label>
            <select name="sort" value={filters.sort} onChange={handleFilterChange}>
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="availability">Наличие на складе</option>
            </select>
          </div>
          <button className="reset-filters" onClick={handleResetFilters}>
            Сбросить фильтры
          </button>
        </div>
      </aside>
      <section className="main-content">
        <div className="category-nav">
          <a href="/">Главная</a> &gt;&gt; 
          <span>{selectedCategory ? categories.find((cat) => cat.id === selectedCategory).name : "Категория"}</span>
        </div>

        <h2>{selectedCategory ? categories.find((cat) => cat.id === selectedCategory).name : "Выберите категорию"}</h2>
        <hr className="dashed-line" />
        <div className="cards-container">
          {filteredProducts().length > 0 ? (
            filteredProducts().map((product) => (
              <ProductCard
                key={product.id}
                {...product} // Передаем все свойства продукта как пропсы
              />
            ))
          ) : (
            <div className="no-products">
              <p>Товаров, соответствующих вашему запросу, не обнаружено.</p>
              <img src={CatImage} alt="Jumping Cat" className="cat" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
