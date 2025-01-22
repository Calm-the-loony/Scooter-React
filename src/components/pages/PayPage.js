import React from "react";
import "../../style/PayPage.scss";

// Импорт изображений
import onlinePaymentImage from "../../image/pay.png";
import cashPaymentImage from "../../image/pay1.png";
import codPaymentImage from "../../image/pay2.png";

const PayPage = () => {
  return (
    <main className="pay-page">
      <h1 className="pay-title">Способы оплаты</h1>

      {/* Навигация по разделам оплаты */}
      <nav className="pay-toc">
        <ul>
          <li>
            <a href="#online-payment">Онлайн-оплата (Робокасса)</a>
          </li>
          <li>
            <a href="#cash-payment">Оплата наличными</a>
          </li>
          <li>
            <a href="#cod-payment">Наложенный платёж</a>
          </li>
        </ul>
      </nav>

      {/* Онлайн оплата */}
      <section id="online-payment" className="pay-section">
        <h2 className="pay-method-title">Онлайн-оплата (Робокасса)</h2>
        <img
          src={onlinePaymentImage}
          alt="Робокасса"
          className="pay-img"
        />
        <p>
          Мы принимаем платежи через платформу <strong>Робокасса</strong>. Вы
          можете оплатить через следующие способы:
        </p>
        <ul className="pay-details">
          <li>Банковские карты Visa/Mastercard/Мир</li>
          <li>Электронные кошельки: Яндекс.Деньги, KIWI</li>
          <li>Терминалы Евросеть и другие</li>
        </ul>
      </section>

      {/* Оплата наличными */}
      <section id="cash-payment" className="pay-section">
        <h2 className="pay-method-title">Оплата наличными</h2>
        <img
          src={cashPaymentImage}
          alt="Оплата наличными"
          className="pay-img"
        />
        <p>
          Вы можете оплатить заказ наличными при самовывозе в нашем магазине по
          адресу:
        </p>
        <p>
          <strong>г. Ростов-на-Дону, ул. Дранко, 141 "В"</strong>
        </p>
      </section>

      {/* Наложенный платёж */}
      <section id="cod-payment" className="pay-section">
        <h2 className="pay-method-title">Наложенный платёж</h2>
        <img
          src={codPaymentImage}
          alt="Наложенный платёж"
          className="pay-img"
        />
        <p>
          Оплата производится на почте при получении товара в пунктах выдачи{" "}
          <strong>Я.Маркета</strong>.
        </p>
        <p>
          Для других способов доставки функция наложенного платежа не
          предусмотрена.
        </p>
        <br />
        <p>
          * После оформления заказа с Вами свяжется менеджер для уточнения
          деталей заказа и отправит ссылку на оплату.
        </p>
      </section>

      <a href="/" className="back-to-main">
        Вернуться на главную страницу
      </a>
    </main>
  );
};

export default PayPage;
