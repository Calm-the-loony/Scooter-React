import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/styles.scss';
import { AuthService } from '../../service/api/auth/AuthApiService';
import RegisterUser from '../../service/dto/UserDTO';


const RegisterPage = () => {
  // const [role, setRole] = useState('user'); // Роль по умолчанию - обычный пользователь
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {

    e.preventDefault();
    const userDto = new RegisterUser(email, password, name, '', '');

    let reqAuth = AuthService.registerUser(userDto).then((res) => {
      const newUser = { name, email, password, orders: [] };
  
      // if (role === 'admin') {
      //   localStorage.setItem('isAdmin', 'true');
      // } else {
      //   localStorage.setItem('isAdmin', 'false');
      // }
  
      navigate('/login');
    }).catch((er) => {

    });
  };

  return (
    <div className="register-page">
      <h1>Регистрация</h1>
      <form onSubmit={handleRegister}>
        <label>
          Имя:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
