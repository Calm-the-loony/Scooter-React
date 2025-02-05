import React, { useState, useEffect } from 'react';
import "../../style/BrandsPage.scss";

// Импорт изображений
import brend1 from "../../image/Brend1.png";

import ProductApiService from "../../service/api/product/ProductService";


const BrandsPage = () => {
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [brands, setBrands] = useState([]);

  const filterByLetter = (letter) => {
    const filtered = brands.filter((brand) =>
      brand.name.startsWith(letter)
    );
    setFilteredBrands(filtered);
  };

  const filterBrands = (event) => {
    const filter = event.target.value.toLowerCase();
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(filter)
    );
    setFilteredBrands(filtered);
  };


  useEffect(() => {
    ProductApiService.allBrands().then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <main className="container">
      <section className="search-section">
        <input
          type="text"
          id="search-bar"
          placeholder="Поиск брендов"
          onChange={filterBrands}
        />
      </section>
      <section className="alphabet-filter">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            className="alphabet-button"
            onClick={() => filterByLetter(letter)}
          >
            {letter}
          </button>
        ))}
        <button className="clear-filter" onClick={() => setFilteredBrands(brands)}>
          Все
        </button>
      </section>
      {brands?
        <section className="brands">
          {brands.map((brand) => (
            <div key={brand.id_brand} className="brand-card" data-name={brand.name}>
              <img src={brand.url_brand? brand.url_brand : brend1} alt={brand.name_brand} />
              <p>{brand.name_brand}</p>
            </div>
          ))}
        </section>
      :
      ""
      }
      <a href="/" className="back-to-main">Вернуться на главную страницу</a>
    </main>
  );
};

export default BrandsPage;
