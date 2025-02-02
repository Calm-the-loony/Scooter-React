import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserApiService } from "../../service/api/user/UserApiService";


const ProductCard = ({ id, stock, type, brand, model, category, image, name, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [idFavourite, setIdFavourite] = useState(null);
  const navigate = useNavigate();

  // Проверка при монтировании компонента, находится ли товар в избранном
  useEffect(() => {
    const favorites = async () => {
      let userFavourite = await UserApiService.userFavourites();
      if (userFavourite) {
        userFavourite.favourites.forEach((el) => {
          if (el.product_info.id_product === id) {
            setIsFavorite(true);
            setIdFavourite(el.product_info.id_favourite);
          }
        })
      }
    }

    favorites();
  }, [id]);

  // Функция для добавления товара в избранное
  const handleAddToFavorites = async (event, id_product) => {
    event.stopPropagation();

    if (!isFavorite) {

      // Добавление товара в избранное
      let id_fav = await UserApiService.addNewFavourite(id);
      if (id_fav) {
        setIdFavourite(id_fav);
        setIsFavorite(true);
      }

    } else {
      // Удаление товара из избранных
      let deleteFav = await UserApiService.deleteUserFavourite(idFavourite);
      if (deleteFav) {
        setIsFavorite(false);
        setIdFavourite(null);
      }
    }
  };

  // Функция для добавления товара в корзину
  const handleAddToCart = async (event, id_product) => {
      console.log(event, id_product);
      await UserApiService.addProductToBasket(id_product);
  };

  // Функция для открытия карточки товара
  const handleCardClick = () => {
    // navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" data-id={id} onClick={handleAddToCart}>
      <img src={image} alt={name} />
      <div className="details">
        <p className="category">{category}</p>
        <p className="name ellipsis">{name}</p>
        <div className="price">
          <div className="original-price-wrapper no-discount">
            <span className="original-prices">{price} ₽</span>
          </div>
          <button className="add-to-cart" onClick={(e) => handleAddToCart(e, id)}>
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
        <button
          className={`add-to-favorites ${isFavorite ? "active" : ""}`}
          onClick={(e) => handleAddToFavorites(e, id)}
        >
          <i className="fas fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
