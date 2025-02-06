import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../cards/ProductCard";
import "../../style/CategoryPage.scss";
import CatImage from "../../image/free-icon-black-cat-3704886.png";
import { ReactComponent as ArrowIcon } from "../../image/arrow-icon.svg";
import ProductApiService from "../../service/api/product/ProductService";
import CategoryApiService from "../../service/api/product/CategoryService";
import {Pagination} from "@mui/material";
import {Stack} from "@mui/material";


const CategoryPage = () => {
  const location = useLocation();
  const initialCategoryId = location.state?.categoryId || null;

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", sort: false });
  const [filteredProductsList, setFilteredProductsList] = useState([]);
  const [pageProducts, setPageProducts] = useState([]);

  // Состояния пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const maxLengthPagination = 10;

  /**
   * Обновление страницы
   * @param {*} event 
   * @param {*} value 
   */
  const pageChanged = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({top: 0, behavior: "smooth"});

    let pageProductsList = [];
    let cnt = 0;
    value--;

    while (cnt < maxLengthPagination) {
      if ((maxLengthPagination*value+cnt) >= pageProducts.length) {
        break;
      } else {
        pageProductsList.push(pageProducts[maxLengthPagination*value+cnt]);
      }
      cnt++;
    }

    // Установка продуктов на страницу
    setFilteredProductsList(pageProductsList);
  }

  // Обновление категории при изменении состояния
  useEffect(() => {
    setSelectedCategory(initialCategoryId);
  }, [initialCategoryId]);

  // Обновление списка товаров при смене категории/подкатегории
  useEffect(() => {
    const products = filteredProducts();
    //setFilteredProductsList(products);
  }, [selectedCategory, selectedSubcategory, filters]);

  // Получаем список товаров
  useEffect(() => {
    ProductApiService.filterProducts().then((productData) => {

      // Устанавливаем данные
      setPageProducts(productData);
      setFilteredProductsList(productData);

    });

    CategoryApiService.allCategories().then((cat) => {
      setCategories(cat.categories);
    }).catch((er) => {
      setCategories([]);
    })
  }, []);

  
  /**
   * Следим за прогрузкой элементов
   */
  useEffect(() => {
        // Прогружаем страницу согласно пагинации
        pageChanged(null, currentPage);
  }, [pageProducts]);

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
      selectedCategory ? selectedCategory : null,
      selectedSubcategory ? selectedSubcategory : null,
      Number(filters.minPrice) ? Number(filters.minPrice) : null,
      Number(filters.maxPrice) ? Number(filters.maxPrice) : null,
      desc,
      availability
    ).then((filtProductList) => {

      // Установка отфильтрованных продуктов
      setFilteredProductsList(filtProductList);
      setPageProducts(filtProductList);

      // Прогрузка продуктов
      pageChanged(null, currentPage);
    })
  }

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
                  <ul className={`subcategories ${expandedCategories[category.id_category] ? "expanded" : ""}`}>
                    {category.subcategory.map((sub) => (
                      <li key={sub.id_subcategory}>
                        <button
                          onClick={() => handleSubcategoryClick(sub.id_subcategory)}
                          className={`subcategory-button ${selectedSubcategory === sub.id_subcategory ? "active" : ""}`}
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
        <h2>
          {getSubcategoryName() || getCategoryName()}
        </h2>
        <hr className="dashed-line" />
        <div className="cards-container">
          {filteredProductsList.length > 0 ? (
            filteredProductsList.map((product) => (
              <ProductCard 
                id={product.id_product}
                stock={product.quantity_product}
                type={product.type_pr}
                brand={product.brand_mark}
                category={product.id_sub_category}
                model={product.models}
                image={product.photo[0]? product.photo[0].photo_url : null}
                name={product.title_product}
                price={product.price_product}
                article={product.article_product}
                extra={product.explanation_product}
                dimensions={product.weight_product}
                tags={product.label_product}
              />
            ))
          ) : (
            <div className="no-products">
              <p>Товаров, соответствующих вашему запросу, не обнаружено.</p>
              <img src={CatImage} alt="Jumping Cat" className="cat" />
            </div>
          )}
        </div>
        {filteredProductsList.length > 0 ? 
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={Math.round((filteredProductsList.length > pageProducts.length ? filteredProductsList : pageProducts).length / maxLengthPagination)}
              shape="rounded"
              page={currentPage}
              onChange={pageChanged}
            />
          </Stack>
        :
        ""
        }
      </section>
    </main>
  );
};

export default CategoryPage;
