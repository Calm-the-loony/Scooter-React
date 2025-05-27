import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "../../style/CategoryPage.scss";
import ArrowIcon from "../../image/arrow-icon.svg?react";
import ProductApiService from "../../service/api/product/ProductService";
import CategoryApiService from "../../service/api/product/CategoryService";
import PaginationScooter from "../other/pagination/Pagination";

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryId = location.state?.categoryId || null;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(+initialCategoryId);
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get("subcategory") ? +searchParams.get("subcategory") : null,
  );
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("minPrice") ? +searchParams.get("minPrice") : null,
    maxPrice: searchParams.get("maxPrice") ? +searchParams.get("maxPrice") : null,
    sort: searchParams.get("sort") ? searchParams.get("sort") : null,
  });
  const [filteredProductsList, setFilteredProductsList] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    filteredProducts();
  }, [selectedCategory, selectedSubcategory, filters]);

  useEffect(() => {
    ProductApiService.filterProducts(
      null,
      initialCategoryId ? initialCategoryId : null,
      selectedSubcategory,
      filters.minPrice,
      filters.maxPrice,
    ).then((productData) => {
      setFilteredProductsList(productData);
    });

    CategoryApiService.allCategories()
      .then((cat) => {
        setCategories(cat.categories);
      })
      .catch(() => {
        setCategories([]);
      });
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    if (isMobile) setSidebarOpen(false);
    updateURL(categoryId, null);
  };

  const handleSubcategoryClick = (subcategoryId, id_category) => {
    setSelectedSubcategory(subcategoryId);
    if (isMobile) setSidebarOpen(false);
    updateURL(id_category, subcategoryId);
  };

  const updateURL = (categoryId, subcategoryId) => {
    navigate(
      `/category/${categoryId}?subcategory=${subcategoryId}&minPrice=${
        filters.minPrice
      }&maxPrice=${filters.maxPrice}&sort=${filters.sort}`
    );
  };

  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.name : "Выберите категорию";
  };

  const getSubcategoryName = () => {
    if (!selectedSubcategory) return null;
    const category = categories.find((cat) => cat.id === selectedCategory);
    if (category) {
      const subcategory = category.subcategories.find(
        (sub) => sub.id === selectedSubcategory,
      );
      return subcategory ? subcategory.name : null;
    }
    return null;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    navigate("/category");
  };

  const filteredProducts = () => {
    let availability = filters.sort === "availability";
    let desc = null;

    switch (filters.sort) {
      case "asc": desc = "asc"; break;
      case "desc": desc = "desc"; break;
      default: desc = "default"; break;
    }

    ProductApiService.filterProducts(
      null,
      selectedCategory == +location.pathname.split("/")[2]
        ? selectedCategory
        : +location.pathname.split("/")[2],
      selectedSubcategory ? selectedSubcategory : null,
      Number(filters.minPrice) ? Number(filters.minPrice) : null,
      Number(filters.maxPrice) ? Number(filters.maxPrice) : null,
      desc,
      availability,
    ).then(setFilteredProductsList);
  };

  return (
    <main className="containers">
      {isMobile && (
        <div className="mobile-tabs">
          <button
            className={`mobile-tab-button ${activeMobileTab === 'categories' ? 'active' : ''}`}
            onClick={() => {
              setSidebarOpen(true);
              setActiveMobileTab('categories');
            }}
          >
            Категории
          </button>
          <button
            className={`mobile-tab-button ${activeMobileTab === 'filters' ? 'active' : ''}`}
            onClick={() => {
              setSidebarOpen(true);
              setActiveMobileTab('filters');
            }}
          >
            Фильтры
          </button>
        </div>
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {isMobile && (
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            &times;
          </button>
        )}

        {(!isMobile || activeMobileTab === 'categories') && (
          <nav className="categories-nav">
            <h2>Категории</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id_category}>
                  <button
                    onClick={() => {
                      toggleCategory(category.id_category);
                      handleCategoryClick(category.id_category);
                    }}
                    className={`category-button ${
                      expandedCategories[category.id_category] ? "active" : ""
                    }`}
                  >
                    {category.name_category}
                    <ArrowIcon
                      className={`arrow-icon ${
                        expandedCategories[category.id_category] ? "rotated" : ""
                      }`}
                    />
                  </button>
                  {expandedCategories[category.id_category] && (
                    <ul className="subcategories expanded">
                      {category.subcategory.map((sub) => (
                        <li key={sub.id_subcategory}>
                          <button
                            onClick={() =>
                              handleSubcategoryClick(
                                sub.id_subcategory,
                                category.id_category,
                              )
                            }
                            className={`subcategory-button ${
                              +selectedSubcategory === +sub.id_subcategory ? "active" : ""
                            }`}
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
        )}

        {(!isMobile || activeMobileTab === 'filters') && (
          <div className="filter-container">
            <h2>Фильтры</h2>
            <div className="filter">
              <label>Цена:</label>
              <div className="price-inputs">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Мин"
                  value={filters.minPrice || ""}
                  onChange={handleFilterChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Макс"
                  value={filters.maxPrice || ""}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="filter">
              <label>Сортировать по:</label>
              <select
                name="sort"
                value={filters.sort || "default"}
                onChange={handleFilterChange}
              >
                <option value="default">По умолчанию</option>
                <option value="asc">Цена: по возрастанию</option>
                <option value="desc">Цена: по убыванию</option>
                <option value="availability">Наличие на складе</option>
              </select>
            </div>
            <button className="reset-filters" onClick={handleResetFilters}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </aside>

      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <section className="main-content">
        <h2>{getSubcategoryName() || getCategoryName()}</h2>
        <hr className="dashed-line" />
        <PaginationScooter
          type="rounded"
          typePagination="product"
          items={filteredProductsList}
        />
      </section>
    </main>
  );
};

export default CategoryPage;