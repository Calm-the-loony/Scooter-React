import React, { useState } from "react";
import "../style/JobsPage.css";

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const showApplicationForm = () => {
    document.getElementById("applicationModal").style.display = "block";
  };

  const closeApplicationForm = () => {
    document.getElementById("applicationModal").style.display = "none";
  };

  const jobList = [
    {
      title: "Сборщик товаров",
      description: "Работа по сборке и упаковке товаров на нашем складе. Требуется внимание к деталям и аккуратность.",
      salary: "40 000 - 50 000 руб.",
      experience: "Нет",
    },
    {
      title: "Кладовщик",
      description: "Работа на складе, прием и размещение товаров, контроль за наличием и состоянием товаров.",
      salary: "45 000 - 55 000 руб.",
      experience: "Нет",
    },
    {
      title: "Оператор погрузчика",
      description: "Управление погрузчиком для перемещения товаров на складе. Необходимы навыки управления погрузчиком.",
      salary: "50 000 - 60 000 руб.",
      experience: "Да",
    },
    {
      title: "Упаковщик",
      description: "Упаковка товаров для отправки клиентам. Важно внимание к деталям и аккуратность.",
      salary: "35 000 - 45 000 руб.",
      experience: "Нет",
    },
    {
      title: "Менеджер по продажам",
      description: "Обработка заявок и продажа продукции клиентам, работа с базой данных клиентов.",
      salary: "60 000 - 80 000 руб.",
      experience: "Да",
    },
    {
      title: "Инженер-метролог",
      description: "Проведение измерений и калибровка оборудования для проверки точности работы.",
      salary: "50 000 - 70 000 руб.",
      experience: "Да",
    },
    {
      title: "Администратор офиса",
      description: "Организация работы офиса, встречи с клиентами, документооборот.",
      salary: "35 000 - 45 000 руб.",
      experience: "Нет",
    },
    {
      title: "Юрист",
      description: "Консультирование по юридическим вопросам, подготовка документов, представление интересов компании.",
      salary: "70 000 - 90 000 руб.",
      experience: "Да",
    },
    {
      title: "Кассир",
      description: "Осуществление расчетов с клиентами, работа с кассовым аппаратом.",
      salary: "30 000 - 40 000 руб.",
      experience: "Нет",
    },
    {
      title: "Рекрутер",
      description: "Поиск и подбор персонала для компании, проведение собеседований.",
      salary: "50 000 - 65 000 руб.",
      experience: "Да",
    },
  ];
  
  

  const filteredJobs = jobList.filter(
    (job) => job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="jobs">
      <h1>ВАКАНСИИ</h1>

      <section className="benefits">
        <h2>Преимущества работы у нас</h2>
        <ul>
          <li><i className="fas fa-users"></i> Дружный коллектив и отличная атмосфера</li>
          <li><i className="fas fa-money-bill-wave"></i> Конкурентоспособная заработная плата</li>
          <li><i className="fas fa-clock"></i> Гибкий график работы</li>
          <li><i className="fas fa-chart-line"></i> Возможности для карьерного роста</li>
          <li><i className="fas fa-gift"></i> Социальный пакет и бонусы</li>
        </ul>
      </section>

      <section className="vacancies">
        <h2>Открытые вакансии</h2>

        <section className="search-section">
          <input
            type="text"
            id="search-bar"
            placeholder="Поиск вакансий"
            value={searchQuery}
            onChange={handleSearch}
          />
        </section>

        {filteredJobs.map((job, index) => (
          <div key={index} className="vacancy-card">
            <h3>{job.title}</h3>
            <p>Описание: {job.description}</p>
            <p>Зарплата: {job.salary}</p>
            <p>Требуется опыт работы: {job.experience}</p>
            <button className="apply-button" onClick={showApplicationForm}>Откликнуться</button>
          </div>
        ))}
      </section>

      {/* Модальное окно для формы отклика */}
      <div className="modal" id="applicationModal">
        <div className="modal-content">
          <span className="close" onClick={closeApplicationForm}>&times;</span>
          <h2>Форма отклика</h2>
          <form id="applicationForm">
            <label htmlFor="name">Имя:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Телефон:</label>
            <input type="tel" id="phone" name="phone" required />

            <label htmlFor="experience">Опыт работы:</label>
            <textarea id="experience" name="experience" required></textarea>

            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>

      <a href="/" className="back-to-main">Вернуться на главную страницу</a>
    </main>
  );
};

export default JobsPage;