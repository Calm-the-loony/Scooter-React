import { useState } from "react";


const Accordion = ({ product }) => {
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
                <p>{product.explanation_product? product.explanation_product : ""}</p>
              </div>
            )}
          </div>
  
          {/* Отзывы */}
          <div className={`accordion-item ${activeIndex === 2 ? "open" : ""}`}>
            <div className="accordion-header" onClick={() => toggleAccordion(2)}>
              <span>Отзывы</span>
              <i
                className={`fas fa-chevron-${activeIndex === 2 ? "up" : "down"}`}
              ></i>
            </div>
            {activeIndex === 2 && (
              <div className="accordion-content">
                <p>Отзывов пока нет.</p>
                <h3>Будьте первым, кто оставил отзыв на “{product.name}”</h3>
                <form>
                  <label>Имя *</label>
                  <input type="text" required />
                  <label>Email *</label>
                  <input type="email" required />
                  <label>Ваша оценка *</label>
                  <select required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <label>Ваш отзыв *</label>
                  <textarea required></textarea>
                  <button type="submit">Отправить</button>
                </form>
              </div>
            )}
          </div>
        </section>
      </section>
    );
  };


export default Accordion;