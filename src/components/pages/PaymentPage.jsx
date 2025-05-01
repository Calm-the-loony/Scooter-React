import React, { useState } from 'react';
import "../../style/PaymentPage.scss";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('selfPickup');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: ''
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;

    // Форматируем дату при вводе
    if (name === 'cardExpiry') {
      let formattedValue = value.replace(/\D/g, ''); // Убираем все нецифровые символы
      if (formattedValue.length >= 3) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      setCardData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setCardData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFocusCVC = () => {
    setIsFlipped(true); // Показываем CVC
  };

  const handleBlurCVC = () => {
    setIsFlipped(false); // Скрываем CVC
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Оформление заказа завершено!');
  };

  const handleCVCChange = (e) => {
    const { value } = e.target;
    if (value.length <= 3) {
      setCardData(prev => ({ ...prev, cardCVC: value }));
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Оплата заказа</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Способ оплаты</label>
          <select value={paymentMethod} onChange={handlePaymentChange}>
            <option value="selfPickup">Самовывоз</option>
            <option value="card">Банковская карта</option>
          </select>
        </div>

        {paymentMethod === 'selfPickup' && (
          <div className="pickup-info">
            <h4>Адрес для самовывоза:</h4>
            <p>г.Ростов-на-Дону. Адрес: улица Дранко, д. 141</p>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className={`card-visual ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-front">
              <div className="card-number">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.cardNumber}
                  onChange={handleCardInputChange}
                  maxLength="19"
                  required
                />
              </div>

              <div className="card-row">
                <div className="card-name">
                  <input
                    type="text"
                    name="cardName"
                    placeholder="IVAN IVANOV"
                    value={cardData.cardName}
                    onChange={handleCardInputChange}
                    required
                  />
                </div>
                <div className="card-expiry">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={cardData.cardExpiry}
                    onChange={handleCardInputChange}
                    maxLength="5"
                    required
                  />
                </div>
                <div className="card-cvc">
                  <input
                    type="text"
                    name="cardCVC"
                    placeholder="CVC"
                    value={isFlipped ? cardData.cardCVC : '•••'}
                    onChange={handleCVCChange}
                    onFocus={handleFocusCVC}
                    onBlur={handleBlurCVC}
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="card-back">
              <p>CVC: {isFlipped ? cardData.cardCVC : '•••'}</p>
            </div>
          </div>
        )}

        <button type="submit" className="submit-button">Подтвердить оплату</button>
      </form>
    </div>
  );
};

export default PaymentPage;
