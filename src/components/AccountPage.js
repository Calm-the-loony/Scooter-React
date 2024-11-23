import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

const AccountPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('account-section');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const user = JSON.parse(localStorage.getItem('userData'));
    setIsAuthenticated(authStatus);

    if (authStatus && user) {
      setUserData(user);
    }
  }, []);

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/login');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = {
      ...userData,
      name: e.target.name.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      // Проверка наличия файла и сохранение старого фото, если файл не был выбран
      photo: e.target.photo.files[0]
        ? URL.createObjectURL(e.target.photo.files[0])
        : userData?.photo || '/default-photo.jpg', // Значение по умолчанию если нет фото
    };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setIsEditing(false);  // Закрываем режим редактирования после сохранения
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="account-page">
      <h1>Личный кабинет</h1>
      <div className="account-wrapper">
        {isAuthenticated ? (
          <>
            <div className="account-tabs">
              <div
                className={`account-tab ${activeTab === 'account-section' ? 'active' : ''}`}
                onClick={() => handleTabClick('account-section')}
              >
                Мои данные
              </div>
              <div
                className={`account-tab ${activeTab === 'account-orders-section' ? 'active' : ''}`}
                onClick={() => handleTabClick('account-orders-section')}
              >
                Мои заказы
              </div>
              <div
                className={`account-tab ${activeTab === 'account-password-section' ? 'active' : ''}`}
                onClick={() => handleTabClick('account-password-section')}
              >
                Изменить пароль
              </div>
            </div>

            <section className={`account-section ${activeTab === 'account-section' ? 'active' : ''}`}>
              <h2 className="account-subheader">Мои данные</h2>
              <div className="profile-photo">
                <img
                  src={userData?.photo || '/default-photo.jpg'}
                  alt="Фото профиля"
                  className="profile-photo-img"
                />
                {isEditing && (
                  <input
                    type="file"
                    name="photo"
                    id="account_photo"
                    className="account-input"
                  />
                )}
              </div>

              <form onSubmit={handleFormSubmit} className="account-form">
                <label htmlFor="account_name" className="account-label">ФИО:</label>
                <input
                  type="text"
                  id="account_name"
                  name="name"
                  className="account-input"
                  required
                  defaultValue={userData?.name || ''}
                  disabled={!isEditing}
                />

                <label htmlFor="account_dob" className="account-label">Дата рождения:</label>
                <input
                  type="date"
                  id="account_dob"
                  name="dob"
                  className="account-input"
                  required
                  defaultValue={userData?.dob || ''}
                  disabled={!isEditing}
                />

                <label htmlFor="account_address" className="account-label">Адрес:</label>
                <input
                  type="text"
                  id="account_address"
                  name="address"
                  className="account-input"
                  required
                  defaultValue={userData?.address || ''}
                  disabled={!isEditing}
                />

                <label htmlFor="account_email" className="account-label">Email:</label>
                <input
                  type="email"
                  id="account_email"
                  name="email"
                  className="account-input"
                  required
                  defaultValue={userData?.email || ''}
                  disabled={!isEditing}
                />

                <label htmlFor="account_phone" className="account-label">Телефон:</label>
                <input
                  type="tel"
                  id="account_phone"
                  name="phone"
                  className="account-input"
                  defaultValue={userData?.phone || ''}
                  disabled={!isEditing}
                />

                {isEditing ? (
                  <>
                    <button type="submit" className="account-button">Сохранить изменения</button>
                    <button type="button" className="account-button" onClick={handleCancelEdit}>Отмена</button>
                  </>
                ) : (
                  <button type="button" className="account-button" onClick={handleEditClick}>Редактировать</button>
                )}
              </form>
            </section>

            <section className={`account-orders-section ${activeTab === 'account-orders-section' ? 'active' : ''}`}>
              <h2 className="account-subheader">Мои заказы</h2>
              <div className="account-orders">
                {userData?.orders?.map((order, index) => (
                  <div key={index} className="order-card">
                    <h3 className="order-title">Заказ №{order.id}</h3>
                    <p>Дата: {order.date}</p>
                    <p>Статус: {order.status}</p>
                    <a href={`/order_details/${order.id}`} className="order-details-link">Подробнее</a>
                  </div>
                ))}
              </div>
            </section>

            <section className={`account-password-section ${activeTab === 'account-password-section' ? 'active' : ''}`}>
              <h2 className="account-subheader">Изменить пароль</h2>
              <form className="account-form">
                <label htmlFor="current_password" className="account-label">Текущий пароль:</label>
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  className="account-input"
                  required
                />

                <label htmlFor="new_password" className="account-label">Новый пароль:</label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  className="account-input"
                  required
                />

                <button type="submit" className="account-button">Сохранить пароль</button>
              </form>
            </section>

            <button onClick={logout} className="logout-btn">
              <i className="fa fa-sign-out-alt"></i> Выйти
            </button>
          </>
        ) : (
          <div className="auth-redirect">
            <h2>Вы не авторизованы</h2>
            <button onClick={() => navigate('/login')} className="auth-btn">
              <i className="fa fa-sign-in-alt"></i> Авторизоваться
            </button>
            <p>
              <button onClick={() => navigate('/register')} className="auth-btn">
                <i className="fa fa-user-plus"></i> Зарегистрироваться
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
