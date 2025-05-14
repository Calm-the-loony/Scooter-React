import React, {useEffect, useState} from "react";
import {UserApiService} from "../../service/api/user/UserApiService";
import "../../style/FavoritesPage.scss";
import {useNavigate} from "react-router-dom";
import PaginationScooter from "../other/pagination/Pagination";

const FavoritesPage = () => {
  const [favouriteProducts, setFavouriteProducts] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    const req = async () => {
      try {
        const favData = await UserApiService.userFavourites();
        if (favData) {
          if (favData.favourites.length >= 1) {
            setFavouriteProducts(favData);
          }
        }
      } catch {
      }
    };

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
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Избранное</h2>
      {favouriteProducts !== null ? (
        <div className="favorites-list">
          <PaginationScooter
            items={favouriteProducts.favourites}
            typePagination="favourite"
            methods={{
              deleteFavouriteProduct: deleteFavouriteProduct,
              handleAddToCart: handleAddToCart,
            }}
            type="rounded"
          />
        </div>
      ) : (
        <p className="favorites-empty">Ваш список избранного пуст.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
