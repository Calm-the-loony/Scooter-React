import React, { useEffect, useState } from "react";
import "../../style/JobsPage.scss";
import { JobsApiService } from "../../service/api/jobs/JobsApiService";


const JobsPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [isChecked, setIsChecked] = useState(false); // Состояние для галочки согласия
  const [jobs, setJobs] = useState([]);

  // Данные пользователя
  const [userData, setUserData] = useState({
    name_user: null,
    email_user: null,
    telephone_user: null,
    experience_user: null
  });
  const [vacancy, setVacancy] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setJobs({jobs: jobs.jobs, filtered: filteredJobs()});
  };

  const showApplicationForm = (id_vacancy) => {
    document.getElementById("applicationModal").style.display = "block";
    setVacancy(id_vacancy);
  };

  const closeApplicationForm = () => {
    document.getElementById("applicationModal").style.display = "none";
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Переключаем состояние чекбокса
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isChecked) {
      alert("Пожалуйста, подтвердите согласие на обработку данных.");
    } else {
      JobsApiService.sendUserRequest(
        userData,
        vacancy
      )
      alert("Ваш отклик отправлен!");
      closeApplicationForm(); // Закрыть модальное окно после отправки
    }
  };

  const filteredJobs = () => jobs.jobs.filter(
    (job) => job.type_work.name_type.toLowerCase().includes(searchQuery.toLowerCase()) || job.description_vacancies.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    JobsApiService.allJobs().then((jobsData) => {
      setJobs({jobs: jobsData.vacancies});
    });

  }, [])

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
        {jobs.filtered?
        <div>
          {jobs.filtered.map((job, index) => (
          <div key={job.id_vacancy} className="vacancy-card">
            <h3>{job.type_work.name_type}</h3>
            <p>Описание: {job.description_vacancies}</p>
            <p>Зарплата: {job.salary_employee}</p>
            <p>Требуется опыт работы: {job.is_worked}</p>
            <button className="apply-button" onClick={(e) => showApplicationForm(job.id_vacancy)}>Откликнуться</button>
          </div>
          ))}
        </div>
        :
        <div>
          {jobs['jobs']?
            <div>
              {jobs.jobs.map((job, index) => (
                <div key={job.id_vacancy} className="vacancy-card">
                  <h3>{job.type_work.name_type}</h3>
                  <p>Описание: {job.description_vacancies}</p>
                  <p>Зарплата: {job.salary_employee}</p>
                  <p>Требуется опыт работы: {job.is_worked}</p>
                  <button className="apply-button" onClick={(e) => showApplicationForm(job.id_vacancy)}>Откликнуться</button>
                </div>
              ))}
            </div> 
          :
          ""}
        </div>
        }
      </section>

      {/* Модальное окно для формы отклика */}
      <div className="jobs-modal" id="applicationModal">
        <div className="jobs-modal-content">
          <button className="jobs-modal-close" onClick={closeApplicationForm}>&times;</button>
          <h2>Отклик на вакансию</h2>
          <form id="applicationForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" name="name" placeholder="Введите ваше имя" required onChange={(e) => {
                setUserData({...userData, name_user: e.target.value});
              }}/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Введите ваш email" required onChange={(e) => {
                setUserData({...userData, email_user: e.target.value});
              }}/>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input type="tel" id="phone" name="phone" placeholder="Введите ваш номер телефона" required onChange={(e) => {
                setUserData({...userData, telephone_user: e.target.value});
              }}/>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Опыт работы</label>
              <textarea id="experience" name="experience" placeholder="Опишите ваш опыт работы" required onChange={(e) => {
                setUserData({...userData, experience_user: e.target.value});
              }}></textarea>
            </div>

            {/* Кнопка для согласия на обработку данных */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Я согласен на обработку моих персональных данных
              </label>
            </div>

            <button type="submit" className="form-submit-button" disabled={!isChecked}>
              Отправить отклик
            </button>
          </form>
        </div>
      </div>

      <a href="/" className="back-to-main">Вернуться на главную страницу</a>
    </main>
  );
};

export default JobsPage;
