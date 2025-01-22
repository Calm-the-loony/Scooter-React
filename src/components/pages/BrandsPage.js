import React, { useState } from 'react';
import "../../style/BrandsPage.scss";

// Импорт изображений
import brend1 from "../../image/Brend1.png";
import brend2 from "../../image/Brend2.jpg";
import brend3 from "../../image/Brend3.png";
import brend4 from "../../image/Brend4.png";
import brend5 from "../../image/Brend5.png";
import brend6 from "../../image/Brend6.png";
import brend7 from "../../image/Brend7.png";

const brandsData = [
  {
    name: 'Scooter24',
    description: 'Поставщик качественных запчастей для скутеров и мотоциклов.',
    img: brend1
  },
  {
    name: 'SM Motors',
    description: 'Известный бренд запчастей и аксессуаров для скутеров.',
    img: brend2
  },
  {
    name: 'Tmmp',
    description: 'Производитель высококачественных запчастей для скутеров и мотоциклов.',
    img: brend3
  },
  {
    name: 'Komatsu',
    description: 'Японский бренд, известный своими инновационными решениями в производстве запчастей для скутеров.',
    img: brend4
  },
  {
    name: 'Koso',
    description: 'Производитель премиальных запчастей и аксессуаров для скутеров.',
    img: brend5
  },
  {
    name: 'ATHENA',
    description: 'Итальянский производитель высококачественных запчастей для скутеров.',
    img: brend6
  },
  {
    name: 'Tecnigas',
    description: 'Ведущий испанский бренд, специализирующийся на выпуске глушителей и других запчастей для скутеров.',
    img: brend7
  },
];

const BrandsPage = () => {
  const [filteredBrands, setFilteredBrands] = useState(brandsData);

  const filterByLetter = (letter) => {
    const filtered = brandsData.filter((brand) =>
      brand.name.startsWith(letter)
    );
    setFilteredBrands(filtered);
  };

  const filterBrands = (event) => {
    const filter = event.target.value.toLowerCase();
    const filtered = brandsData.filter((brand) =>
      brand.name.toLowerCase().includes(filter)
    );
    setFilteredBrands(filtered);
  };

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
        <button className="clear-filter" onClick={() => setFilteredBrands(brandsData)}>
          Все
        </button>
      </section>
      <section className="brands">
        {filteredBrands.map((brand) => (
          <div key={brand.name} className="brand-card" data-name={brand.name}>
            <img src={brand.img} alt={brand.name} />
            <p>{brand.description}</p>
          </div>
        ))}
      </section>
      <a href="index.html" className="back-to-main">Вернуться на главную страницу</a>
    </main>
  );
};

export default BrandsPage;
