import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../style/ProductPage.scss";
import Accordion from "../other/accordion/Accordion";
import ProductApiService from "../../service/api/product/ProductService";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewedProducts, setViewedProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("viewedProducts")) || [];
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    ProductApiService.productData(id).then((productData) => {
      setProduct(productData);
    });
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  const handleAddToCart = () => {
    // addToCart(product);
  };

  const handleAddToFavorites = () => {
    const isAlreadyFavorite = favorites.some((item) => item.id === product.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Добавлено в избранное.");
    } else {
      alert("Этот товар уже в избранном!");
    }
  };

  const truncateText = (text, lines = 2) => {
    const words = text.split(" ");
    if (words.length > lines * 8) {
      return words.slice(0, lines * 8).join(" ");
    }
    return text;
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-image">
          <img src={product.photo ? product.photo[0].photo_url : ""} alt={product.title_product} />
        </div>

        <div className="product-info">
          <h1>{product.title_product}</h1>
          <div className="product-price">
            <p>
              <strong>Цена:</strong>
              {product.product_discount ? (
                <>
                  <span style={{ textDecoration: "line-through", marginRight: "10px" }}>
                    {product.price_product}
                  </span>
                  {product.price_product - (product.price_product * product.product_discount) / 100} ₽
                </>
              ) : (
                product.price_product
              )}
            </p>
          </div>
          <div className="product-stock">
            <p>
              <strong>На складе:</strong> {product.quantity_product > 0 ? "В наличии" : "Не в наличии"}
            </p>
          </div>
          <div className="product-buttons">
            <button className="btn-cart" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
            <button className="btn-favorite" onClick={handleAddToFavorites}>
              Добавить в избранное
            </button>
          </div>
          <div className="info-panel">
            <p>
              <strong>Доп. комплект:</strong>{" "}
              {isExpanded
                ? product.explanation_product
                : truncateText(product.explanation_product || "Нет данных")}
              {!isExpanded && product.explanation_product?.length > 50 && (
                <span
                  className="expand-text"
                  onClick={() => setIsExpanded(true)}
                >
                  {" ..."}
                </span>
              )}
              {isExpanded && (
                <span
                  className="collapse-text"
                  onClick={() => setIsExpanded(false)}
                >
                  {" Свернуть"}
                </span>
              )}
            </p>
            <p>
              <strong>Артикул:</strong> {product.article_product}
            </p>
            <p>
              <strong>Категория:</strong> {product.categories.name}
            </p>
            <p>
              <strong>Метки:</strong> {product.label_product}
            </p>
          </div>
        </div>
      </div>

      <div className="accordion-wrapper">
        <Accordion product={product} />
      </div>

      {/* Просмотренные товары */}
      {/* <div className="viewed-products">
        <h2>Вы недавно смотрели</h2>
        <div className="viewed-list">
          {viewedProducts.map((item) => (
            <div key={item.id} className="viewed-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price} ₽</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProductPage;
