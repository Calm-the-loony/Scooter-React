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

  const [selectedCategory, setSelectedCategory] = useState(+initialCategoryId);
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get("subcategory") ? +searchParams.get("subcategory") : null,
  );
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("minPrice")
      ? +searchParams.get("minPrice")
      : null,
    maxPrice: searchParams.get("maxPrice")
      ? +searchParams.get("maxPrice")
      : null,
    sort: searchParams.get("sort") ? searchParams.get("sort") : null,
  });
  const [filteredProductsList, setFilteredProductsList] = useState([]);

  useEffect(() => {
    filteredProducts();
  }, [selectedCategory, selectedSubcategory, filters]);

  // Получаем список товаров
  useEffect(() => {
    ProductApiService.filterProducts(
      null,
      initialCategoryId ? initialCategoryId : null,
      selectedSubcategory,
      filters.minPrice,
      filters.maxPrice,
    ).then(
      (productData) => {
        // Устанавливаем данные
        setFilteredProductsList(productData);
      },
      [searchParams],
    );

    CategoryApiService.allCategories()
      .then((cat) => {
        setCategories(cat.categories);
      })
      .catch((er) => {
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

    navigate(
      "/category/" +
        categoryId +
        "?subcategory=" +
        selectedSubcategory +
        "&minPrice=" +
        filters.minPrice +
        "&maxPrice=" +
        filters.maxPrice +
        "&sort=" +
        filters.sort,
    );
  };

  const handleSubcategoryClick = (subcategoryId, id_category) => {
    setSelectedSubcategory(subcategoryId);
    navigate(
      "/category/" +
        id_category +
        "?subcategory=" +
        subcategoryId +
        "&minPrice=" +
        filters.minPrice +
        "&maxPrice=" +
        filters.maxPrice +
        "&sort=" +
        filters.sort,
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

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    searchParams.set(name, value);
    setSearchParams(searchParams);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters to initial state
  const handleResetFilters = () => {
    navigate("/category");
  };

  /**
   * Фильтрация продуктов
   */
  const filteredProducts = () => {
    let availability = filters.sort === "availability";
    let desc = null;

    switch (filters.sort) {
      case "asc": {
        desc = "asc";
        break;
      }
      case "desc": {
        desc = "desc";
        break;
      }
      default: {
        desc = "default";
        break;
      }
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
    ).then((filtProductList) => {
      console.log(filtProductList);

      setFilteredProductsList(filtProductList);
    });
  };

  return (
    <main className="containers">
      <aside className="sidebar">
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
                  className={`category-button ${expandedCategories[category.id_category] ? "active" : ""}`}
                >
                  {category.name_category}
                  <ArrowIcon
                    className={`arrow-icon ${expandedCategories[category.id_category] ? "rotated" : ""}`}
                  />
                </button>
                {expandedCategories[category.id_category] && (
                  <ul
                    className={`subcategories ${expandedCategories[category.id_category] ? "expanded" : ""}`}
                  >
                    {category.subcategory.map((sub) => (
                      <li key={sub.id_subcategory}>
                        <button
                          onClick={() =>
                            handleSubcategoryClick(
                              sub.id_subcategory,
                              category.id_category,
                            )
                          }
                          className={`subcategory-button ${+selectedSubcategory === +sub.id_subcategory ? "active" : ""}`}
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
              style={{ marginTop: "10px" }}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Макс"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              style={{ marginTop: "10px" }}
            />
          </div>
          <div className="filter">
            <label>Сортировать по:</label>
            <select
              name="sort"
              value={filters.sort}
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
      </aside>
      <section className="main-content">
        <h2>{getSubcategoryName() || getCategoryName()}</h2>
        <hr className="dashed-line" />
        <PaginationScooter
          type="rounded"
          typePagination="product"
          items={filteredProductsList}
        ></PaginationScooter>
      </section>
    </main>
  );
};

export default CategoryPage;
