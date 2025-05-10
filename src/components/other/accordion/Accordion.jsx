import {useState} from "react";


const StarRating = ({ rating, setRating }) => {
  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? "filled" : ""}`}
          onClick={() => handleClick(index)}
        >
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default function Accordion({ product }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <section className="accordion-container">
      <section className="accordion">
        {/* Детали */}
        <div className={`accordion-item ${activeIndex === 0 ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(0)}>
            <span>Детали</span>
            <i
              className={`fas fa-chevron-${activeIndex === 0 ? "up" : "down"}`}
            ></i>
          </div>
          {activeIndex === 0 && (
            <div className="accordion-content">
              <p>
                <strong>Вес:</strong> {product.weight_product || "Не указан"}
              </p>
              <p>
                <strong>Габариты:</strong> {product.dimensions || "Не указаны"}
              </p>
            </div>
          )}
        </div>

        {/* Описание */}
        <div className={`accordion-item ${activeIndex === 1 ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(1)}>
            <span>Описание</span>
            <i
              className={`fas fa-chevron-${activeIndex === 1 ? "up" : "down"}`}
            ></i>
          </div>
          {activeIndex === 1 && (
            <div className="accordion-content">
              <p>{product.explanation_product || ""}</p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
