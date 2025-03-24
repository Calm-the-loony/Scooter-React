import { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const handleClick = (index) => {
    setRating(index + 1); // Устанавливаем рейтинг, начиная с 1
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

const Accordion = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 1,
    comment: "",
  });

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    product.reviews.push({
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
    });
    setShowReviewForm(false);
    setNewReview({
      name: "",
      email: "",
      rating: 1,
      comment: "",
    });
  };

  return (
    <section className="accordion-container">
      <section className="accordion">
        {/* Детали */}
        <div className={`accordion-item ${activeIndex === 0 ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(0)}>
            <span>Детали</span>
            <i className={`fas fa-chevron-${activeIndex === 0 ? "up" : "down"}`}></i>
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
            <i className={`fas fa-chevron-${activeIndex === 1 ? "up" : "down"}`}></i>
          </div>
          {activeIndex === 1 && (
            <div className="accordion-content">
              <p>{product.explanation_product || ""}</p>
            </div>
          )}
        </div>

        {/* Отзывы */}
        <div className={`accordion-item ${activeIndex === 2 ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(2)}>
            <span>Отзывы</span>
            <i className={`fas fa-chevron-${activeIndex === 2 ? "up" : "down"}`}></i>
          </div>
          {activeIndex === 2 && (
            <div className="accordion-content">
              {product.reviews && product.reviews.length > 0 ? (
                <div className="reviews">
                  <h3>Отзывы о товаре:</h3>
                  {product.reviews.map((review, index) => (
                    <div key={index} className="review">
                      <p>
                        <strong>{review.name}</strong>
                        {" (Оценка: "}
                        <span className="review-rating">
                          {[...Array(5)].map((_, starIndex) => (
                            <span key={starIndex}>
                              {starIndex < review.rating ? "★" : "☆"}
                            </span>
                          ))}
                        </span>
                        {")"}
                      </p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Отзывов пока нет.</p>
              )}

              {/* Кнопка для отображения формы отзыва */}
              {!showReviewForm && (
                <button onClick={() => setShowReviewForm(true)} className="review-button">
                  Оставить отзыв
                </button>
              )}

              {/* Форма для отзыва */}
              {showReviewForm && (
                <div className="review-form">
                  <form onSubmit={handleSubmitReview}>
                    <button type="button" onClick={() => setShowReviewForm(false)} className="close-form-button">
                      × Закрыть форму
                    </button>
                    <label>Имя *</label>
                    <input
                      type="text"
                      name="name"
                      value={newReview.name}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={newReview.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Ваша оценка *</label>
                    <StarRating rating={newReview.rating} setRating={(rating) => setNewReview({ ...newReview, rating })} />
                    <label>Ваш отзыв *</label>
                    <textarea
                      name="comment"
                      value={newReview.comment}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    <button type="submit">Отправить</button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

// Пример данных продукта с отзывом
const product = {
  name: "Товар 1",
  weight_product: "1 кг",
  dimensions: "10x10x10 см",
  explanation_product: "Описание продукта...",
  reviews: [
    {
      name: "Иван Иванов",
      rating: 5,
      comment: "Отличный товар! Все работает как нужно."
    }
  ]
};

export default function App() {
  return <Accordion product={product} />;
}
