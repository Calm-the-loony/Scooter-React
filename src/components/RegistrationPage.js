import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

const RegistrationPage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formData = {
            email: e.target.email.value,
            confirmEmail: e.target.confirmEmail.value,
            name: e.target.name.value,
            surname: e.target.surname.value,
            password: e.target.password.value,
        };

        if (formData.email !== formData.confirmEmail) {
            setError('Почта не совпадает.');
            return;
        }

        localStorage.setItem('userData', JSON.stringify(formData));
        setSuccess('Регистрация успешна! Вы можете авторизоваться.');
    };

    return (
        <div className="registration-form form-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit} className="form">
                <input name="email" type="email" placeholder="Почта" required className="form-input" />
                <input name="confirmEmail" type="email" placeholder="Повторите почту" required className="form-input" />
                <input name="name" type="texts" placeholder="Имя" required className="form-input" />
                <input name="surname" type="texts" placeholder="Фамилия" required className="form-input" />
                <input name="password" type="password" placeholder="Пароль" required className="form-input" />
                <label>
                    <input type="checkbox" required /> Согласие на обработку данных
                </label>
                <button type="submit" className="form-btn">Зарегистрироваться</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && (
                <>
                    <p className="success-message">{success}</p>
                    <button onClick={() => navigate('/login')} className="form-btns">Перейти к авторизации</button>
                </>
            )}
        </div>
    );
};

export default RegistrationPage;
