// src/components/FeaturedProducts.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "../cards/ProductCard"; // Убедитесь, что у вас есть компонент ProductCard

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Загружаем товары из файла products.json
    setProducts(productsData);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <section className="featured-products">
      <h2>Популярные товары</h2>
      <Slider {...carouselSettings}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            stock={product.stock}
            type={product.type}
            brand={product.brand}
            model={product.model}
            image={product.image}
            name={product.name}
            price={product.price}
            article={product.article}
            extra={product.extra}
            dimensions={product.dimensions}
            tags={product.tags}
          />
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedProducts;
