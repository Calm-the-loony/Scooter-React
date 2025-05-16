import React, { useEffect, useState } from "react";
import "../../style/BrandsPage.scss";

import brend1 from "../../image/Brend1.png";

import ProductApiService from "../../service/api/product/ProductService";

const BrandsPage = () => {
  const [filteredBrands, setFilteredBrands] = useState(null);
  const [brands, setBrands] = useState([]);

  const filterByLetter = (letter, is_all = false) => {
    if (is_all) {
      setFilteredBrands(null);
    } else {
      const filtered = brands.filter((brand) =>
        brand.name_brand.startsWith(letter),
      );
      setFilteredBrands(filtered);
    }
  };

  const filterBrands = (event) => {
    const filter = event.target.value.toLowerCase();
    const filtered = brands.filter((brand) =>
      brand.name_brand.toLowerCase().includes(filter),
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
        <button
          className="clear-filter"
          onClick={() => setFilteredBrands(brands, true)}
        >
          Все
        </button>
      </section>
      {filteredBrands ? (
        <section className="brands">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id_brand}
              className="brand-card"
              data-name={brand.name}
            >
              <img
                src={brand.url_brand ? brand.url_brand : brend1}
                alt={brand.name_brand}
              />
              <p>{brand.name_brand}</p>
            </div>
          ))}
        </section>
      ) : (
        <section className="brands">
          {brands.map((brand) => (
            <div
              key={brand.id_brand}
              className="brand-card"
              data-name={brand.name}
            >
              <img
                src={brand.url_brand ? brand.url_brand : brend1}
                alt={brand.name_brand}
              />
              <p>{brand.name_brand}</p>
            </div>
          ))}
        </section>
      )}
      <a href="/" className="back-to-main">
        Вернуться на главную страницу
      </a>
    </main>
  );
};

export default BrandsPage;
