import React from 'react';

const ProductCard = ({ id, stock, type, brand, model, image, name, price, article, extra, dimensions, tags }) => {
  return (
    <div className="product-card" data-id={id} data-stock={stock} data-type={type} data-brand={brand} data-model={model}>
      <img src={image} alt={name} />
      <div className="details">
        <p className="category">Электрика</p>
        {/* Ограничиваем отображение текста на 2 строках */}
        <p className="name ellipsis">{name}</p>
        <div className="price">
          <div className="original-price-wrapper no-discount">
            <span className="original-prices">{price}</span>
          </div>
          <button className="add-to-cart"><i className="fas fa-shopping-cart"></i></button>
          <div className="stock-bar" title="В наличии много"></div>
        </div>
        <button className="add-to-favorites"><i className="fas fa-heart"></i></button>
      </div>
      {/* Информация о товаре остаётся скрытой */}
      <div className="product-info" style={{ display: 'none' }}>
        <p className="article">Артикул: {article}</p>
        <p className="extra">Доп. комплект: {extra}</p>
        <p className="dimensions">Габариты: {dimensions}</p>
        <div className="product-details">
          <p className="type">Тип: {type}</p>
          <p className="brand">Бренд: {brand}</p>
          <p className="model">Модели: {model}</p>
        </div>
        <p className="tags">Метки: {tags}</p>
      </div>
    </div>
  );
};

export default ProductCard;
