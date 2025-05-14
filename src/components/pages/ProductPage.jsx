import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserApiService} from "../../service/api/user/UserApiService";
import ProductApiService from "../../service/api/product/ProductService";
import "../../style/ProductPage.scss";
import "../../style/ProductCard.scss";
import Pagination from "../other/pagination/Pagination";
import Accordion from "../other/accordion/Accordion";

const ProductPage = () => {
  const selector = useSelector(state => state.auth.isAuthenticated);
  const [userStar, setUserStar] = useState(0);
  const [userReviewDescription, setUserReviewDescription] = useState("");
  const [viewedProducts, setViewedProducts] = useState([]);
  const { id } = useParams();
  const [created, setCreated] = useState(false);
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);  
  const [idFavourite, setIdFavourite] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  // Загрузка просмотренных товаров из localStorage при монтировании
  useEffect(() => {
    const storedProducts = localStorage.getItem("viewedProducts");
    if (storedProducts) {
      setViewedProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загружаем данные о товаре
        const productData = await ProductApiService.productData(id);
        setProduct(productData);

        // Обновляем просмотренные товары
        setViewedProducts(prevProducts => {
          // Удаляем текущий товар, если он уже есть в списке
          const filteredProducts = prevProducts.filter(
            item => item.id_product !== productData.id_product
          );
          
          // Добавляем текущий товар в начало списка
          const newViewedProducts = [productData, ...filteredProducts];
          
          // Ограничиваем количество просмотренных товаров
          const limitedProducts = newViewedProducts.slice(0, 10);
          
          // Сохраняем в localStorage
          localStorage.setItem("viewedProducts", JSON.stringify(limitedProducts));
          
          return limitedProducts;
        });

        // Загружаем отзывы о товаре
        const reviewData = await ProductApiService.getAllReviewByProductId(id);
        setReview(reviewData?.reviews || []);

        // Проверка, является ли товар в избранном
        if (selector) {
          const userFavourite = await UserApiService.userFavourites();
          if (userFavourite) {
            const foundFavorite = userFavourite.favourites.find(
              el => el.product_info.id_product === id
            );
            if (foundFavorite) {
              setIsFavorite(true);
              setIdFavourite(foundFavorite.product_info.id_favourite);
            }
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    const userOrders = async () => {
      try {
        const req = await UserApiService.userOrders();

        if (req) {
          const arrayId = [];

          for (let order of req) {
            for (let productData of order.product_data) {
              arrayId.push(productData.id_product);
            }
          }

          setUserOrders(arrayId);
        }
      } catch {}
    }

    fetchData();
  }, [id, selector]);

  const handleAddToCart = async () => {
    if (!selector) return;
    try {
      if (product.quantity_product > 0 || !userOrders.includes(id)) {
        await UserApiService.addProductToBasket(id);
        setAddedToCart(true);
      }
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }
  };

  const handleAddToFavorites = async () => {
    if (!selector) return;
    
    try {
      if (!isFavorite) {
        const id_fav = await UserApiService.addNewFavourite(id);
        if (id_fav) {
          setIdFavourite(id_fav);
          setIsFavorite(true);
        }
      } else {
        const deleteFav = await UserApiService.deleteUserFavourite(idFavourite);
        if (deleteFav) {
          setIsFavorite(false);
          setIdFavourite(null);
        }
      }
    } catch (error) {
      console.error("Ошибка при работе с избранным:", error);
    }
  };

  const truncateText = (text, lines = 2) => {
    if (!text) return "Нет данных";
    const words = text.split(" ");
    if (words.length > lines * 8) {
      return words.slice(0, lines * 8).join(" ") + "...";
    }
    return text;
  };

  function createReview() {
    if (!product) return;
    
    ProductApiService.createReview({
      text_review: userReviewDescription,
      estimation_review: userStar,
      id_product: product.id_product
    }).finally(() => {
      setCreated(false);
      // Обновляем отзывы после создания
      ProductApiService.getAllReviewByProductId(id).then((reviewData) => {
        setReview(reviewData?.reviews || []);
      });
    });
  }

  if (!product) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-image">
          <img
            src={product.photo?.[0]?.photo_url || ""}
            alt={product.title_product}
            onError={(e) => {
              e.target.src = "/path/to/default/image.jpg";
            }}
          />
        </div>

        <div className="product-info">
          <h1>{product.title_product}</h1>
          <div className="product-price">
            <p>
              <strong>Цена:</strong>
              {product.product_discount ? (
                <>
                  <span className="old-price">
                    {product.price_product} ₽
                  </span>
                  <span className="new-price">
                    {Math.round(product.price_product - 
                      (product.price_product * product.product_discount) / 100)} ₽
                  </span>
                  <span className="discount-badge">
                    -{product.product_discount}%
                  </span>
                </>
              ) : (
                <span>{product.price_product} ₽</span>
              )}
            </p>
          </div>
          <div className="product-stock">
            <p>
              <strong>На складе:</strong>{" "}
              {product.quantity_product > 0
                ? `В наличии (${product.quantity_product} шт.)`
                : "Нет в наличии"}
            </p>
          </div>
          <div className="product-buttons">
            <button
              className={`btn-cart ${!selector || product.quantity < 1 || userOrders.includes(+id) ? "disabled" : ""}`}
              onClick={handleAddToCart}
              disabled={!selector}
            >
              {addedToCart || userOrders.includes(+id) ? "Добавлен в корзину" : "Добавить в корзину"}
            </button>
            <button
              className={`btn-favorite ${isFavorite ? "active" : ""} ${!selector ? "disabled" : ""}`}
              onClick={handleAddToFavorites}
              disabled={!selector}
            >
              {isFavorite ? "В избранном" : "В избранное"}
            </button>
          </div>
          <div className="info-panel">
            <p>
              <strong>Доп. комплект:</strong>{" "}
              {isExpanded
                ? product.explanation_product || "Нет данных"
                : truncateText(product.explanation_product)}
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
              <strong>Артикул:</strong> {product.article_product || "—"}
            </p>
            <p>
              <strong>Категория:</strong> {product.categories?.name || "—"}
            </p>
            <p>
              <strong>Метки:</strong> {product.label_product || "—"}
            </p>
          </div>
          <div className="accordion-wrapper">
            <Accordion product={product} />
          </div>
        </div>
      </div>

      {created && (
        <div className="review-create-form">
          <form onSubmit={(e) => {
            e.preventDefault();
            createReview();
          }}>
            <h3>Отзыв на товар</h3>
            <div
              className="close"
              onClick={() => setCreated(false)}
            >
              &times;
            </div>
            <div className="input-element">
              <label htmlFor="description">Ваш отзыв</label>
              <textarea
                placeholder="Напишите ваш отзыв здесь..."
                id="description"
                value={userReviewDescription}
                onChange={(e) => setUserReviewDescription(e.target.value)}
                required
              />
            </div>
            <div className="input-element">
              <label>Ваша оценка</label>
              <div className="rating-mini">
                {[1, 2, 3, 4, 5].map((item) => (
                  <span
                    key={item}
                    className={userStar >= item ? "active" : ""}
                    onClick={() => setUserStar(item)}
                  ></span>
                ))}
              </div>
            </div>
            <button type="submit" disabled={!userStar || !userReviewDescription}>
              Отправить отзыв
            </button>
          </form>
        </div>
      )}

      <div className="product-other">
        <div className="product-review">
          <div className="product-review__create">
            <h2>Отзывы</h2>
            {selector && (
              <button 
                className="btn-create-review" 
                onClick={() => setCreated(true)}
              >
                Оставить отзыв
              </button>
            )}
          </div>
          <Pagination typePagination="review" items={review} />
        </div>

        <div className="viewed-products">
          <h2>Вы недавно смотрели</h2>
          <div className="viewed-list">
            {viewedProducts.length > 0 ? (
              viewedProducts.map((item) => (
                <div key={item.id_product} className="viewed-item">
                  <img 
                    src={item?.photo?.[0]?.photo_url || "/path/to/default/image.jpg"} 
                    alt={item.title_product} 
                  />
                  <p>{item.title_product}</p>
                  <span className="viewed-price">
                    {item.price_product} ₽
                  </span>
                </div>
              ))
            ) : (
              <p className="no-viewed">Вы еще не смотрели другие товары</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;