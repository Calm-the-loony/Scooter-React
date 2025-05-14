import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../style/styles.scss";
import {UserApiService} from "../../service/api/user/UserApiService";
import {UpdateUser} from "../../service/dto/UserDTO";
import {useDispatch} from "react-redux";
import {exitUser} from "../../state/actions/authAction";
import PaginationScooter from "../other/pagination/Pagination";
import {AuthService} from "../../service/api/auth/AuthApiService";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [userOrdersData, setUserOrdersData] = useState(null);
  const [activeTab, setActiveTab] = useState("account-section");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const [address, setAddress] = useState(null);
  const [addressCity, setAddressCity] = useState(null);
  const [dateBirthday, setDateBirthDay] = useState(null);
  const [mainNameUser, setMainNameUser] = useState(null);
  const [telephone, setTelephoneUser] = useState(null);

  const [userOldPassword, setUserOldPassword] = useState(null);
  const [userNewPassword, setUserNewPassword] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Запрос на получение информации о пользователе
    const data = UserApiService.informationAboutUser().then((dataUser) => {
      if (dataUser === false) {
      } else {
        setUserData(dataUser);
      }
    });
  }, []);

  const logout = () => {

    AuthService.logoutUser().then(() => {
      // Обновление в хранилище
      dispatch(exitUser());

      setIsAdmin(false);
      setUserData(null);
      navigate("/login");
    }).catch(() => {});
  };

  const handleTabClick = (tab) => {
    const req = UserApiService.userSuccessOrders()
      .then((data) => {
        setUserOrdersData(data);
      })
      .catch((er) => {});
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
      email: form.account_address_city.value,
      phone: form.phone.value,
    };

    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
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
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };

  const updateUserData = function (event) {
    const userData = new UpdateUser(
      mainNameUser,
      dateBirthday,
        addressCity,
      address,
      telephone,
    );
    const req = UserApiService.updateUserInformation(userData)
      .then((okMessage) => {
      })
      .catch((erMessage) => {
        alert("Не удалось обновить информацию!");
      });
  };

  const updateUserPassword = function (event) {
    event.preventDefault();

    const req = UserApiService.updateUserPassword(
      userOldPassword,
      userNewPassword,
    )
      .then((ok) => {
        navigate("/login");
      })
      .catch((er) => {
      });
  };

  return (
    <div className="account-page">
      {userData ? (
        <div>
          <h2>Личный кабинет</h2>
          <div className="account-wrapper">
            <div className="account-tabs">
              <div
                className={`account-tab ${activeTab === "account-section" ? "active" : ""}`}
                onClick={() => handleTabClick("account-section")}
              >
                Мои данные
              </div>
              <div
                className={`account-tab ${activeTab === "account-orders-section" ? "active" : ""}`}
                onClick={() => handleTabClick("account-orders-section")}
              >
                Мои заказы
              </div>
              <div
                className={`account-tab ${activeTab === "account-password-section" ? "active" : ""}`}
                onClick={() => handleTabClick("account-password-section")}
              >
                Изменить пароль
              </div>
            </div>

            <section
              className={`account-section ${activeTab === "account-section" ? "active" : ""}`}
            >
              <h2 className="account-subheader">Мои данные</h2>

              <form onSubmit={handleFormSubmit} className="account-form">
                <label htmlFor="account_name" className="account-label">
                  ФИО:
                </label>
                <input
                  type="text"
                  id="account_name"
                  name="name"
                  className="account-input"
                  required
                  defaultValue={userData ? userData.main_name_user : ""}
                  disabled={!isEditing}
                  onChange={(value) => {
                    setMainNameUser(value.target.value);
                  }}
                />

                <label htmlFor="account_dob" className="account-label">
                  Дата рождения:
                </label>
                <input
                  type="date"
                  id="account_dob"
                  name="dob"
                  className="account-input"
                  required
                  defaultValue={userData?.date_birthday || ""}
                  disabled={!isEditing}
                  onChange={(value) => {
                    setDateBirthDay(value.target.value);
                  }}
                />
                <label htmlFor="account_address_city" className="account-label">
                  Город:
                </label>
                <input
                    type="text"
                    id="account_address_city"
                    name="account_address_city"
                    className="account-input"
                    required
                    defaultValue={userData?.address_city || ""}
                    disabled={!isEditing}
                    onChange={(value) => {
                      setAddressCity(value.target.value);
                    }}
                />
                <label htmlFor="account_address" className="account-label">
                  Адрес:
                </label>
                <input
                  type="text"
                  id="account_address"
                  name="address"
                  className="account-input"
                  required
                  defaultValue={userData?.address || ""}
                  disabled={!isEditing}
                  onChange={(value) => {
                    setAddress(value.target.value);
                  }}
                />

                <label htmlFor="account_email" className="account-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="account_email"
                  name="email"
                  className="account-input"
                  required
                  defaultValue={userData ? userData.email_user : ""}
                  disabled={true}
                />

                <label htmlFor="account_phone" className="account-label">
                  Телефон:
                </label>
                <input
                  type="tel"
                  id="account_phone"
                  name="phone"
                  className="account-input"
                  defaultValue={userData?.telephone || ""}
                  disabled={!isEditing}
                  onChange={(value) => {
                    setTelephoneUser(value.target.value);
                  }}
                />

                {isEditing ? (
                  <div className="edit-buttons">
                    <button
                      type="submit"
                      className="account-button"
                      onClick={updateUserData}
                    >
                      Сохранить изменения
                    </button>
                    <button
                      type="button"
                      className="account-button"
                      onClick={handleCancelEdit}
                    >
                      Отмена
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="account-button"
                    onClick={handleEditClick}
                  >
                    Редактировать
                  </button>
                )}
              </form>
            </section>

            <section
              className={`account-orders-section ${activeTab === "account-orders-section" ? "active" : ""}`}
            >
              <h2 className="account-subheader">Мои заказы</h2>
              <div className="account-orders">
                <PaginationScooter
                  type="rounded"
                  items={userOrdersData?.orders ? userOrdersData.orders : []}
                  typePagination="order"
                ></PaginationScooter>
              </div>
            </section>

            <section
              className={`account-password-section ${activeTab === "account-password-section" ? "active" : ""}`}
            >
              <h2 className="account-subheader">Изменить пароль</h2>
              <form className="account-form" onSubmit={updateUserPassword}>
                <label htmlFor="current_password" className="account-label">
                  Текущий пароль:
                </label>
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

                <label htmlFor="new_password" className="account-label">
                  Новый пароль:
                </label>
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

                <button type="submit" className="account-button">
                  Сохранить пароль
                </button>
              </form>
            </section>

            <button onClick={logout} className="logout-btn">
              <i className="fa fa-sign-out-alt"></i> Выйти
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AccountPage;
