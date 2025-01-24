import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/styles.scss';
import { TokenMixin } from '../../service/api/mixins/UserMixins';
import { UserApiService } from '../../service/api/user/UserApiService';
import UserDTO from '../../service/dto/UserDTO';


const AccountPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userOrdersData, setUserOrdersData] = useState(null);
  const [activeTab, setActiveTab] = useState('account-section');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Добавляем состояние для проверки на админа

  // Данные состояния для обновления информации о пользователе
  const [address, setAddress] = useState(null);
  const [dateBirthday, setDateBirthDay] = useState(null);
  const [mainNameUser, setMainNameUser] = useState(null);
  const [telephone, setTelephoneUser] = useState(null);

  // Данные безопасности (пароль)
  const [userOldPassword, setUserOldPassword] = useState(null);
  const [userNewPassword, setUserNewPassword] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';

    // Запрос на получение информации о пользователе
    const data = UserApiService.informationAboutUser().then((dataUser) => {
      setUserData(dataUser);
    }).catch((er) => {

    });

    setIsAuthenticated(authStatus);

    if (authStatus && userData) {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true'); // Проверяем, является ли пользователь администратором
    }
  }, []);

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserData(null);
    TokenMixin.clearToken();
    navigate('/login');
  };

  const handleTabClick = (tab) => {
    const req = UserApiService.userOrders().then((data) => {
      setUserOrdersData(data);
    }).catch((er) => {
      
    })
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

  const updateUserData = function(event) {
    const userData = new UserDTO(mainNameUser, dateBirthday, address, telephone);
    const req = UserApiService.updateUserInformation(
      userData
    ).then((okMessage) => {
      
    }).catch((erMessage) => {
      alert("Не удалось обновить информацию!");
    });
  };

  const updateUserPassword = function(event) {
    event.preventDefault();

    const req = UserApiService.updateUserPassword(userOldPassword, userNewPassword).then((ok) => {
      TokenMixin.clearToken();
      navigate("/login");
    }).catch((er) => {
      console.log(er);
    });
  }

  return (
    <div className="account-page">
      {userData? <div>
        <h2>Личный кабинет</h2>
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
                  defaultValue={userData? userData.main_name_user : ''}
                  disabled={!isEditing}
                  onChange={(value) => {
                    setMainNameUser(value.target.value);
                  }}
                />

                <label htmlFor="account_dob" className="account-label">Дата рождения:</label>
                <input
                  type="date"
                  id="account_dob"
                  name="dob"
                  className="account-input"
                  required
                  defaultValue={userData?.date_birthday || ''}
                  disabled={!isEditing}
                  onChange={(value) => {
                    setDateBirthDay(value.target.value);
                  }}
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
                  onChange={(value) => {
                    setAddress(value.target.value);
                  }}
                />

                <label htmlFor="account_email" className="account-label">Email:</label>
                <input
                  type="email"
                  id="account_email"
                  name="email"
                  className="account-input"
                  required
                  defaultValue={userData? userData.email_user : ''}
                  disabled={true}
                />

                <label htmlFor="account_phone" className="account-label">Телефон:</label>
                <input
                  type="tel"
                  id="account_phone"
                  name="phone"
                  className="account-input"
                  defaultValue={userData?.telephone || ''}
                  disabled={!isEditing}
                  onChange={(value) => {
                    setTelephoneUser(value.target.value);
                  }}
                />

                {isEditing ? (
                  <div className="edit-buttons">
                    <button type="submit" className="account-button" onClick={updateUserData}>Сохранить изменения</button>
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
                {userOrdersData?.orders?.length ? (
                  userOrdersData.orders.map((order, index) => (
                    <div key={index} className="order-card">
                      <h3 className="order-title">Заказ №{order.order_data.id}</h3>
                      <div className="order-info">
                        <p>
                          <span>Дата:</span> {order.order_data.date_buy}
                        </p>
                        <p>
                          <span>Статус:</span>{''}
                          <span
                            style={{
                              color: order.order_data.status === 'Доставлен' ? 'green' : 'orange',
                              fontWeight: 'bold',
                            }}
                          >
                            {order.order_data.status}
                          </span>
                        </p>
                        <p>
                          <span>Способ доставки:</span> {order.deliveryMethod}
                        </p>
                        <p>
                          <span>Способ оплаты:</span> {'Картой'}
                        </p>
                        <p>
                          <span>Сумма:</span> {order.order_data.price_result} ₽
                        </p>
                      </div>
                      <h4>Товары:</h4>
                      <ul className="order-items">
                        <li key={order.product_data.title}>
                          <span>{order.product_data.name_product}</span> — {order.order_data.quantity} шт. ({order.product_data.price_product} ₽/шт)
                        </li>
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
              <form className="account-form" onSubmit={updateUserPassword}>
                <label htmlFor="current_password" className="account-label">Текущий пароль:</label>
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  className="account-input"
                  required
                  onChange={(e) => {
                    setUserOldPassword(e.target.value);
                  }}
                />

                <label htmlFor="new_password" className="account-label">Новый пароль:</label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  className="account-input"
                  required
                  onChange={(e) => {
                    setUserNewPassword(e.target.value);
                  }}
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
      </div> : ""}
    </div>
  );
};

export default AccountPage;
