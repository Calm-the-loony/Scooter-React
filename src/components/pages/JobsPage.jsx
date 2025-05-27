import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaChartLine,
  FaGift,
  FaChevronRight,
  FaTools
} from "react-icons/fa";
import { JobsApiService } from "../../service/api/jobs/JobsApiService";
import "../../style/JobsPage.scss";

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [userData, setUserData] = useState({
    name_user: "",
    email_user: "",
    telephone_user: "",
    experience_user: "",
  });
  const [vacancy, setVacancy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Новый стейт

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const showApplicationForm = (id_vacancy) => {
    setIsModalOpen(true);
    setVacancy(id_vacancy);
  };

  const closeApplicationForm = () => {
    setIsModalOpen(false);
    setNotificationMessage("");
    setError("");
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isChecked) {
      setNotificationMessage("Пожалуйста, подтвердите согласие на обработку данных.");
      return;
    }

    JobsApiService.sendUserRequest(userData, vacancy)
      .then(() => {
        closeApplicationForm();
        setUserData({
          name_user: "",
          email_user: "",
          telephone_user: "",
          experience_user: "",
        });
        setIsChecked(false);
      })
      .catch(() => {
        setError("Не удалось отправить отклик на вакансию");
      });
  };

  const filteredJobs =
    jobs.jobs?.filter(
      (job) =>
        job.type_work?.name_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description_vacancies?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  useEffect(() => {
    JobsApiService.allJobs().then((jobsData) => {
      setJobs({ jobs: jobsData.vacancies || [] });
    });
  }, []);

  return (
    <main className="jobs-page">
      <div className="jobs-container">
        <h1 className="page-title">Карьера в Scooter24</h1>

        <section className="benefits-section">
          <h2 className="section-title">Почему стоит работать у нас?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaUsers />
              </div>
              <h3>Дружный коллектив</h3>
              <p>Комфортная атмосфера и поддержка коллег</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaMoneyBillWave />
              </div>
              <h3>Конкурентная зарплата</h3>
              <p>Достойное вознаграждение за ваш труд</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaClock />
              </div>
              <h3>Гибкий график</h3>
              <p>Возможность подстроить работу под ваш ритм жизни</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaChartLine />
              </div>
              <h3>Карьерный рост</h3>
              <p>Реальные возможности для профессионального развития</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaTools />
              </div>
              <h3>Современное оборудование</h3>
              <p>Работа на качественной и новой технике</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaGift />
              </div>
              <h3>Бонусы и льготы</h3>
              <p>Дополнительные преимущества для сотрудников</p>
            </div>
          </div>
        </section>

        <section className="vacancies-section">
          <div className="section-header">
            <h2 className="section-title">Открытые вакансии</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Поиск вакансий..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          </div>

          <div className="vacancies-list">
            {(searchQuery ? filteredJobs : jobs.jobs || []).map((job) => (
              <div key={job.id_vacancy} className="vacancy-card">
                <div className="vacancy-info">
                  <h3>{job.type_work?.name_type || "Вакансия"}</h3>
                  <p className="salary">Зарплата: {job.salary_employee || "по договорённости"}</p>
                  <p className="experience">Требуемый опыт: {job.is_worked || "не требуется"}</p>
                  <p className="description">{job.description_vacancies || "Описание не указано"}</p>
                </div>
                <button
                  className="apply-button"
                  onClick={() => showApplicationForm(job.id_vacancy)}
                >
                  Откликнуться <FaChevronRight />
                </button>
              </div>
            ))}

            {jobs.jobs?.length === 0 && (
              <div className="no-vacancies">
                <p>В данный момент открытых вакансий нет</p>
                <p>Оставьте свои контакты, и мы свяжемся с вами, когда появятся новые возможности</p>
              </div>
            )}
          </div>
        </section>

        <Link to="/" className="back-to-main">
          Вернуться на главную
        </Link>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" id="applicationModal">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Отклик на вакансию</h2>
              <button className="close-button" onClick={closeApplicationForm}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-group">
                <label htmlFor="name">Ваше имя*</label>
                <input
                  type="text"
                  id="name"
                  value={userData.name_user}
                  onChange={(e) =>
                    setUserData({ ...userData, name_user: e.target.value })
                  }
                  required
                  placeholder="Иван Иванов"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  value={userData.email_user}
                  onChange={(e) =>
                    setUserData({ ...userData, email_user: e.target.value })
                  }
                  required
                  placeholder="example@mail.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон*</label>
                <input
                  type="tel"
                  id="phone"
                  value={userData.telephone_user}
                  onChange={(e) =>
                    setUserData({ ...userData, telephone_user: e.target.value })
                  }
                  required
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Опыт работы*</label>
                <textarea
                  id="experience"
                  value={userData.experience_user}
                  onChange={(e) =>
                    setUserData({ ...userData, experience_user: e.target.value })
                  }
                  required
                  placeholder="Опишите ваш опыт работы, навыки и достижения"
                ></textarea>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="privacyPolicy">
                  Я согласен на обработку моих персональных данных в соответствии с{" "}
                  <Link to="/legal" target="_blank" className="privacy-link">
                    Политикой конфиденциальности
                  </Link>
                </label>
              </div>

              {notificationMessage && (
                <div className="notification-message">{notificationMessage}</div>
              )}

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className={`submit-button ${!isChecked ? "disabled" : ""}`}
                disabled={!isChecked}
              >
                Отправить отклик
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default JobsPage;
