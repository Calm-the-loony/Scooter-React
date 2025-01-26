import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { UserApiService } from "../../service/api/user/UserApiService";
import "../../style/FavoritesPage.scss";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  
  const [favouriteProducts, setFavouriteProducts] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigator = useNavigate();

  useEffect(
    () => {
      const req = async () => {
        const favData = await UserApiService.userFavourites();
        if (favData) {
          setFavouriteProducts(favData);
        }
      }

      req();
    }, []);

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
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
      {favouriteProducts ? (
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
                  <button className="favorite-add-to-cart" onClick={() => handleAddToCart(item)}>
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
