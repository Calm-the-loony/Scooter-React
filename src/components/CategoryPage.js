import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import categories from "../data/categories";
import ProductCard from "../components/ProductCard";
import "../style/CategoryPage.scss";
import CatImage from "../image/free-icon-black-cat-3704886.png";
import { ReactComponent as ArrowIcon } from "../image/arrow-icon.svg";

const CategoryPage = () => {
  const location = useLocation();
  const initialCategoryId = location.state?.categoryId || null;

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", sort: "default" });
  const [filteredProductsList, setFilteredProductsList] = useState([]);

  // Обновление категории при изменении состояния
  useEffect(() => {
    setSelectedCategory(initialCategoryId);
  }, [initialCategoryId]);

  // Обновление списка товаров при смене категории/подкатегории
  useEffect(() => {
    const products = filteredProducts();
    setFilteredProductsList(products);
  }, [selectedCategory, selectedSubcategory, filters]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const filteredProducts = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    if (!category) return [];

    const subcategory = selectedSubcategory
      ? category.subcategories.find((sub) => sub.id === selectedSubcategory)
      : null;

    let products = subcategory
      ? subcategory.products
      : category.subcategories.flatMap((sub) => sub.products);

    if (filters.minPrice) {
      products = products.filter((product) => parseFloat(product.price) >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      products = products.filter((product) => parseFloat(product.price) <= parseFloat(filters.maxPrice));
    }

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

  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.name : "Выберите категорию";
  };

  const getSubcategoryName = () => {
    if (!selectedSubcategory) return null;
    const category = categories.find((cat) => cat.id === selectedCategory);
    if (category) {
      const subcategory = category.subcategories.find((sub) => sub.id === selectedSubcategory);
      return subcategory ? subcategory.name : null;
    }
    return null;
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters to initial state
  const handleResetFilters = () => {
    setFilters({ minPrice: "", maxPrice: "", sort: "default" });
  };

  return (
    <main className="containers">
      <aside className="sidebar">
        <nav className="categories-nav">
          <h2>Категории</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => {
                    toggleCategory(category.id);
                    handleCategoryClick(category.id);
                  }}
                  className={`category-button ${expandedCategories[category.id] ? "active" : ""}`}
                >
                  {category.name}
                  <ArrowIcon
                    className={`arrow-icon ${expandedCategories[category.id] ? "rotated" : ""}`}
                  />
                </button>
                {expandedCategories[category.id] && (
  <ul className={`subcategories ${expandedCategories[category.id] ? "expanded" : ""}`}>
    {category.subcategories.map((sub) => (
      <li key={sub.id}>
        <button
          onClick={() => handleSubcategoryClick(sub.id)}
          className={`subcategory-button ${selectedSubcategory === sub.id ? "active" : ""}`}
        >
          {sub.name}
        </button>
      </li>
    ))}
  </ul>
)}

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
        <h2>
          {getSubcategoryName() || getCategoryName()}
        </h2>
        <hr className="dashed-line" />
        <div className="cards-container">
          {filteredProductsList.length > 0 ? (
            filteredProductsList.map((product) => (
              <ProductCard key={product.id} {...product} />
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
