import React from "react";
import "../../style/ShippingPage.scss";

// Импорт изображений
import cdekImage from "../../image/delivery.png";
import russianPostImage from "../../image/delivery3.png";
import yamarketImage from "../../image/Delivery2.png";

const ShippingPage = () => {
  return (
    <main className="shipping-page">
      <h1 className="shipping-title">Доставка и оплата</h1>

      {/* Навигация по разделам доставки */}
      <nav className="shipping-toc">
        <ul>
          <li>
            <a href="#general-shipping">Общая информация о доставке</a>
          </li>
          <li>
            <a href="#cdek">Доставка транспортной компанией СДЕК</a>
          </li>
          <li>
            <a href="#russian-post">Доставка Почтой России</a>
          </li>
          <li>
            <a href="#yamarket">Доставка сервисом Я.Маркета</a>
          </li>
          <li>
            <a href="#pickup">Самовывоз</a>
          </li>
          <li>
            <a href="#payment-details">Реквизиты для оплаты</a>
          </li>
        </ul>
      </nav>

      {/* Общая информация о доставке */}
      <section id="general-shipping" className="shipping-section">
        <h2 className="shipping-method-title">Общая информация о доставке</h2>
        <p>
          Доставка товаров возможна по всей России. Стоимость доставки
          рассчитывается автоматически в процессе оформления заказа. Отправка
          заказа (при наличии товара на складе) осуществляется в день заказа или
          на следующий рабочий день после подтверждения заказа.
        </p>
        <p>
          При выборе способа оплаты «наложенным платежом» или «Наличными
          курьеру», отправка осуществляется после подтверждения заказа. При
          выборе безналичной оплаты — после поступления средств.
        </p>
      </section>

      {/* Доставка СДЕК */}
      <section id="cdek" className="shipping-section">
        <h2 className="shipping-method-title">Доставка транспортной компанией СДЕК</h2>
        <img src={cdekImage} alt="Доставка СДЕК" className="shipping-img" />
        <p>
          СДЕК — дешевый, удобный и быстрый способ доставки. Вы можете оформить
          доставку самовывозом из пункта выдачи заказов в вашем городе, что
          позволит сэкономить. Также возможна доставка до двери, что обойдется
          немного дороже.
        </p>
        <p>
          При заказе в Москву или Санкт-Петербург на сумму более 5 000 рублей —
          доставка бесплатная.
        </p>
      </section>

      {/* Доставка Почтой России */}
      <section id="russian-post" className="shipping-section">
        <h2 className="shipping-method-title">Доставка Почтой России</h2>
        <img src={russianPostImage} alt="Доставка Почтой России" className="shipping-img" />
        <p>
          Доставка Почтой России — это не всегда быстро, но дешево и с
          возможностью доставки в любой уголок России.
        </p>
      </section>

      {/* Доставка Я.Маркет */}
      <section id="yamarket" className="shipping-section">
        <h2 className="shipping-method-title">Доставка почтовым сервисом Я.Маркета</h2>
        <img src={yamarketImage} alt="Доставка Я.Маркета" className="shipping-img" />
        <p>
          Я.Маркет — один из самых быстрых и надежных способов доставки. Курьер
          доставит ваш заказ до ближайшего к вам пункта выдачи. Возможность
          проверки товара и целостности упаковки перед получением, а также
          моментальный отказ при необходимости.
        </p>
      </section>

      {/* Самовывоз */}
      <section id="pickup" className="shipping-section">
        <h2 className="shipping-method-title">Самовывоз</h2>
        <p>
          Вы можете забрать заказ самостоятельно из нашего розничного магазина в
          Ростове-на-Дону. Адрес: улица Дранко, д. 141. Парковка бесплатна для
          клиентов в течение 30 минут.
        </p>
      </section>

      {/* Реквизиты для оплаты */}
      <section id="payment-details" className="shipping-section">
        <h2 className="shipping-method-title">Реквизиты для оплаты</h2>
        <p>Перед оплатой, пожалуйста, убедитесь в наличии товаров на складе.</p>
        <p>
          <strong>ИП Куча Сергей Дмитриевич</strong>
        </p>
        <p>
          Адрес: 344068, Ростовская обл., г. Ростов-на-Дону, ул. Паленко, д. 15
          с. 6
        </p>
        <p>
          ИНН: 616116488461
          <br />
          ОГРНИП: 321619600007412
          <br />
          ОКПО: 2005010073
          <br />
          ОКАТО: 60401362000
          <br />
          ОКТМО: 60701000001
        </p>
        <p>
          БИК: 044525068
          <br />
          Расчетный счет: 40802810900000040945
          <br />
          Корреспондентский счет: 30101810645374525068
        </p>
        <p>ОКВЭД: 52.50.3; 50.30.2</p>
      </section>

      <a href="/" className="back-to-main">
        Вернуться на главную страницу
      </a>
    </main>
  );
};

export default ShippingPage;
