import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/BrandsPage.scss";
import brend1 from "../../image/Brend1.png";
import ProductApiService from "../../service/api/product/ProductService";

const BrandsPage = () => {
  const [filteredBrands, setFilteredBrands] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    ProductApiService.allBrands()
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  const filterByLetter = (letter, isAll = false) => {
    if (isAll) {
      setFilteredBrands(null);
    } else {
      const filtered = brands.filter((brand) =>
        brand.name_brand.toUpperCase().startsWith(letter)
      );
      setFilteredBrands(filtered);
    }
  };

  const filterBrands = (event) => {
    const filter = event.target.value.toLowerCase();
    const filtered = brands.filter((brand) =>
      brand.name_brand.toLowerCase().includes(filter)
    );
    setFilteredBrands(filtered);
  };

  const handleBrandClick = (brandId) => {
    navigate(`/category`, { state: { brandId } });
  };

  const renderAlphabetButtons = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return letters.map((letter) => (
      <button
        key={letter}
        className="alphabet-button"
        onClick={() => filterByLetter(letter)}
      >
        {letter}
      </button>
    ));
  };

  const renderBrands = (brandsToRender) => {
    return brandsToRender.map((brand) => (
      <div
        key={brand.id_brand}
        className="brand-card"
        onClick={() => handleBrandClick(brand.id_brand)}
      >
        <img
          src={brand.url_brand || brend1}
          alt={brand.name_brand}
          className="brand-image"
          onError={(e) => {
            e.target.src = brend1;
          }}
        />
        <p className="brand-name">{brand.name_brand}</p>
      </div>
    ));
  };

  return (
    <main className="brands-container">
      <h1 className="page-title">Бренды</h1>
      
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Поиск брендов..."
          onChange={filterBrands}
        />
      </div>

      <div className="alphabet-filter">
        {renderAlphabetButtons()}
        <button
          className="show-all-button"
          onClick={() => filterByLetter("", true)}
        >
          Все
        </button>
      </div>

      <div className="brands-grid">
        {filteredBrands ? renderBrands(filteredBrands) : renderBrands(brands)}
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        Вернуться на главную
      </button>
    </main>
  );
};

export default BrandsPage;