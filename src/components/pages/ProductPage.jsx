import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Accordion from "../other/accordion/Accordion";
import ProductApiService from "../../service/api/product/ProductService";
import "../../style/ProductPage.scss";
import "../../style/ProductCard.scss";
import Pagination from "../other/pagination/Pagination";


const ProductPage = () => {

  const selector = useSelector(state => state.isAuthenticated);

  const [userStar, setUserStar] = useState(0);
  const [userReviewDescription, setUserReviewDescription] = useState("");

  const [viewedProducts, setViewedProducts] = useState(localStorage.getItem('viewedProducts') ? JSON.parse(localStorage.getItem('viewedProducts')) : []);

  const { id } = useParams();
  const [created, setCreated] = useState(false);

  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [review, setReview] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    ProductApiService.productData(id).then((productData) => {
      setProduct(productData);
      localStorage.setItem(
          "viewedProducts", JSON.stringify([productData, ...viewedProducts])
      )
    });

    ProductApiService.getAllReviewByProductId(id).then((reviewData) => {
      setReview(reviewData?.reviews);
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
    } else {
    }
  };

  const truncateText = (text, lines = 2) => {
    const words = text.split(" ");
    if (words.length > lines * 8) {
      return words.slice(0, lines * 8).join(" ");
    }
    return text;
  };

  function createReview() {
      ProductApiService.createReview(
          {
            text_review: userReviewDescription,
            estimation_review: userStar,
            id_product: product.id_product
          }
      ).finally(() => {
        setCreated(false);
      })
  }

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-image">
          <img
            src={product.photo ? product.photo[0].photo_url : ""}
            alt={product.title_product}
          />
        </div>

        <div className="product-info">
          <h1>{product.title_product}</h1>
          <div className="product-price">
            <p>
              <strong>Цена:</strong>
              {product.product_discount ? (
                <>
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginRight: "10px",
                    }}
                  >
                    {product.price_product}
                  </span>
                  {product.price_product -
                    (product.price_product * product.product_discount) /
                      100}{" "}
                  ₽
                </>
              ) : (
                product.price_product
              )}
            </p>
          </div>
          <div className="product-stock">
            <p>
              <strong>На складе:</strong>{" "}
              {product.quantity_product > 0 ? "В наличии " + product.quantity_product : "Не в наличии"}
            </p>
          </div>
          <div className="product-buttons">
            <button
                className={`btn-cart ${selector ? "" : "disabled"}`}
                onClick={handleAddToCart}
                disabled={selector ? false : true}
            >
              Добавить в корзину
            </button>
            <button
                className={`btn-favorite ${selector ? "" : "disabled"}`}
                onClick={handleAddToFavorites}
                disabled={selector ? false : true}
            >
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
          <div className="accordion-wrapper">
            <Accordion product={product} />
          </div>
        </div>
      </div>
      {created ? (
          <div className="review-create-form">
            <form onSubmit={createReview}>
              <h3>Отзыв на товар</h3>
              <div className="close" style={{marginRight: "10px"}} onClick={() => {setCreated(!created)}}>
                &times;
              </div>
              <div className="input-element">
                <label htmlFor="description">Ваш прекрасный отзыв</label>
                <textarea placeholder="Ваш отзыв" id="description" onChange={(e) => setUserReviewDescription(e.target.value)}>Ваш отзыв</textarea>
              </div>
              <div className="input-element">
                <label htmlFor="estimation">Ваша оценка</label>
                <div className="rating-mini">
                  {[1,2,3,4,5].map((item) => (
                      <span
                          key={item}
                          className={userStar >= item ? "active" : ""}
                          onClick={() => setUserStar(item)}
                      ></span>
                  ))}
                </div>
              </div>
              <button type="submit">Отправить</button>
            </form>
          </div>
      ) : ""}
      <br/>
      <div className="product-other">
        <div className="product-review">
          <div className="product-review__create">
            <h2>Отзывы</h2>
            <a onClick={() => {setCreated(!created)}}>Оставить отзыв</a>
          </div>
          <Pagination typePagination="review" items={review} />
        </div>
        <div className="viewed-products">
          <h2>Вы недавно смотрели</h2>
          <div className="viewed-list">
            {viewedProducts.map((item, index) => {
              if (index > 5) {
              } else {
                return (
                    <div key={item.id} className="viewed-item">
                      <img src={item?.photo[0]?.photo_url} alt={item.title_product} />
                      <p>{item.title_product}</p>
                      <p>{item.price_product} ₽</p>
                    </div>
                )
              }
            }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
