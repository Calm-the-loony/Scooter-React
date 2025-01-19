import React from "react";
import "../style/TechTipsPage.scss";

// Импорт изображений
import engineImage from "../image/bezymyannyy.jpg";
import transmissionImage from "../image/LcBIeuFLP9M.jpg";
import suspensionImage from "../image/Ha666317831a4499db4f0f211c0e3e02ew.jpg_480x480.webp";

const TechTipsPage = () => {
  return (
    <main className="tech-tips-page container">
      <section className="overview">
       
      </section>

      <section className="components">
        <h2>Основные компоненты скутера</h2>
        
        {/* Двигатель */}
        <article className="component">
          <h3>Двигатель</h3>
          <p>
            Двигатель - это сердце вашего скутера. Он преобразует топливо в механическую энергию, приводя в движение все остальные системы. Важно регулярно обслуживать двигатель, менять масло и фильтры, чтобы он работал эффективно и надежно.
          </p>
          <img src={engineImage} alt="Двигатель скутера" />
          <div className="links">
            <a href="https://www.dilex-moto.ru/upload/iblock/462/LX_GTR_3.pdf" className="link">Руководство по установке двигателя</a>
            <a href="https://www.youtube.com/watch?v=examplevideo1" className="link" target="_blank" rel="noopener noreferrer">Видео: Замена масла в двигателе</a>
          </div>
        </article>

        {/* Трансмиссия */}
        <article className="component">
          <h3>Трансмиссия</h3>
          <p>
            Трансмиссия передает мощность от двигателя к колесам. Она включает в себя цепь, шестерни и другие элементы. Регулярная проверка и смазка трансмиссии поможет избежать износа и повреждений.
          </p>
          <img src={transmissionImage} alt="Трансмиссия скутера" />
          <div className="links">
            <a href="http://scooter-club.spb.ru/viewtopic.php?t=6" className="link">Руководство по установке трансмиссии</a>
            <a href="https://www.youtube.com/watch?v=examplevideo2" className="link" target="_blank" rel="noopener noreferrer">Видео: Настройка трансмиссии</a>
          </div>
        </article>

        {/* Подвеска */}
        <article className="component">
          <h3>Подвеска</h3>
          <p>
            Подвеска обеспечивает плавное и стабильное движение скутера, поглощая неровности дороги. Правильная настройка и регулярное обслуживание подвески улучшат комфорт и безопасность вашего скутера.
          </p>
          <img src={suspensionImage} alt="Подвеска скутера" />
          <div className="links">
            <a href="https://www.dilex-moto.ru/upload/iblock/462/LX_GTR_3.pdf" className="link">Руководство по установке подвески</a>
            <a href="https://www.youtube.com/watch?v=examplevideo3" className="link" target="_blank" rel="noopener noreferrer">Видео: Настройка подвески</a>
          </div>
        </article>
      </section>

      <section className="videos">
        <h2>Видеоуроки</h2>
        <article className="video">
          <h3>Видео: Замена масла в двигателе</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/examplevideo1" frameborder="0" allowfullscreen></iframe>
        </article>
        <article className="video">
          <h3>Видео: Регулировка карбюратора</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/examplevideo2" frameborder="0" allowfullscreen></iframe>
        </article>
      </section>

      <section className="articles">
        <h2>Полезные статьи</h2>
        <article className="article">
          <h3>Как выбрать правильные запчасти для скутера</h3>
          <p>
            Советы и рекомендации по выбору запчастей для вашего скутера, чтобы обеспечить его долговечность и надежность. Мы предлагаем широкий ассортимент качественных запчастей для различных моделей скутеров.
          </p>
          <a href="https://benzozip.ru/text-latest/kak-podobrat-zapchasti-dlya-skutera/" className="link">Читать статью</a>
        </article>
        <article className="article">
          <h3>Поддержание скутера в отличном состоянии</h3>
          <p>
            Руководство по уходу и техническому обслуживанию скутера, чтобы он всегда был в отличном состоянии. Используйте наши запчасти и инструменты для регулярного обслуживания вашего скутера.
          </p>
          <a href="https://jr-garage.com.ua/gallery_post_type/ukhod-za-skuterom" className="link">Читать статью</a>
        </article>
      </section>

      <a href="/" className="back-to-main">Вернуться на главную страницу</a>
    </main>
  );
};

export default TechTipsPage;
