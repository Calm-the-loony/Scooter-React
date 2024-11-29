import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

const AccountPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('account-section');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Добавляем состояние для проверки на админа
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const user = JSON.parse(localStorage.getItem('userData'));
    setIsAuthenticated(authStatus);

    if (authStatus && user) {
      setUserData(user);
      setIsAdmin(localStorage.getItem('isAdmin') === 'true'); // Проверяем, является ли пользователь администратором
    }
  }, []);

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserData(null);
    navigate('/login');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedUserData = {
      ...userData,
      name: form.name.value,
      dob: form.dob.value,
      address: form.address.value,
      email: form.email.value,
      phone: form.phone.value,
    };

    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    const updatedOrders = userData.orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    const updatedUserData = { ...userData, orders: updatedOrders };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
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
              {isAdmin && (
                <div
                  className={`account-tab ${activeTab === 'admin-panel' ? 'active' : ''}`}
                  onClick={() => handleTabClick('admin-panel')}
                >
                  Админ-панель
                </div>
              )}
            </div>

            <section className={`account-section ${activeTab === 'account-section' ? 'active' : ''}`}>
              <h2 className="account-subheader">Мои данные</h2>

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
                  <div className="edit-buttons">
                    <button type="submit" className="account-button">Сохранить изменения</button>
                    <button type="button" className="account-button" onClick={handleCancelEdit}>Отмена</button>
                  </div>
                ) : (
                  <button type="button" className="account-button" onClick={handleEditClick}>Редактировать</button>
                )}
              </form>
            </section>

            <section className={`account-orders-section ${activeTab === 'account-orders-section' ? 'active' : ''}`}>
              <h2 className="account-subheader">Мои заказы</h2>
              <div className="account-orders">
                {userData?.orders?.length ? (
                  userData.orders.map((order, index) => (
                    <div key={index} className="order-card">
                      <h3 className="order-title">Заказ №{order.id}</h3>
                      <div className="order-info">
                        <p>
                          <span>Дата:</span> {order.date}
                        </p>
                        <p>
                          <span>Статус:</span>{' '}
                          <span
                            style={{
                              color: order.status === 'Доставлен' ? 'green' : 'orange',
                              fontWeight: 'bold',
                            }}
                          >
                            {order.status}
                          </span>
                        </p>
                        <p>
                          <span>Способ доставки:</span> {order.deliveryMethod}
                        </p>
                        <p>
                          <span>Способ оплаты:</span> {order.paymentMethod}
                        </p>
                        <p>
                          <span>Сумма:</span> {order.total} ₽
                        </p>
                      </div>
                      <h4>Товары:</h4>
                      <ul className="order-items">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            <span>{item.name}</span> — {item.quantity} шт. ({item.price} ₽/шт)
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>У вас пока нет заказов.</p>
                )}
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

            {isAdmin && (
              <section className={`admin-panel ${activeTab === 'admin-panel' ? 'active' : ''}`}>
                <h2 className="account-subheader">Админ-панель</h2>
                <div className="admin-orders">
                  {userData?.orders?.length ? (
                    userData.orders.map((order) => (
                      <div key={order.id} className="order-card">
                        <h4>Заказ №{order.id}</h4>
                        <p>Статус: {order.status}</p>
                        <button onClick={() => handleOrderStatusChange(order.id, 'Доставлен')}>Отметить как доставленный</button>
                      </div>
                    ))
                  ) : (
                    <p>Нет заказов для администрирования.</p>
                  )}
                </div>
              </section>
            )}

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
