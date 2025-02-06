import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { UserApiService } from "../../service/api/user/UserApiService";
import "../../style/FavoritesPage.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {exitUser} from "../../state/actions/authAction";

const FavoritesPage = () => {
  
  const [favouriteProducts, setFavouriteProducts] = useState(null);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(
    () => {
      const req = async () => {
        const favData = await UserApiService.userFavourites();
        if (favData) {
          if (favData.favourites.length >= 1) {
            setFavouriteProducts(favData)
          }
        } else {
          dispatch(exitUser());
        }
      }

      req();
    }, []);

  const handleAddToCart = async (id_product) => {
    const req = await UserApiService.addProductToBasket(id_product);
  };


  const deleteFavouriteProduct = async (id_favourite) => {
    const req = await UserApiService.deleteUserFavourite(id_favourite);
      if (favouriteProducts.favourites && req) {
        const newUserFav = await UserApiService.userFavourites();
        if (newUserFav) {
          setFavouriteProducts(newUserFav);
          navigator("/favorites");
        }
      }
  }

  
  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Избранное</h2>
      {favouriteProducts !== null ? (
        <div className="favorites-list">
          {favouriteProducts.favourites.map((item) => (
            <div key={item.product_info.id_favourite} className="favorite-item">
              <img src={item.product_info.photos[0]} alt={item.product_name} className="favorite-image" />
              <div className="favorite-details">
                <p className="favorite-name">{item.product_info.product_name}</p>
                <p className="favorite-price">{item.product_info.price_product} ₽</p>
                <p className="favorite-stock">
                  {item.product_info.quantity > 0 ? `В наличии (${item.product_info.quantity} шт)` : "Нет в наличии"}
                </p>
              </div>
              <div className="favorite-actions">
                <button className="favorite-remove" onClick={(e) => deleteFavouriteProduct(item.product_info.id_favourite)}>
                  Удалить
                </button>
                {item.product_info.quantity > 0 && (
                  <button className="favorite-add-to-cart" onClick={() => handleAddToCart(item.product_info.id_product)}>
                    В корзину
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="favorites-empty">Ваш список избранного пуст.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
