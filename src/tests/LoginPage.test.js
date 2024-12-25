import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

describe('LoginPage Component', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation((message) => {
      if (message.includes('React Router Future Flag Warning')) return;
      console.warn(message);
    });
  });

  afterAll(() => {
    console.warn.mockRestore();
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  afterEach(() => {
    global.alert.mockRestore();
  });

  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Авторизация')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль:')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  test('handles successful login', () => {
    const mockUser = { email: 'test@example.com', password: 'password123', role: 'user' };
    localStorage.setItem('userData', JSON.stringify(mockUser));

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Войти'));

    expect(localStorage.getItem('isAuthenticated')).toBe('true');
    expect(localStorage.getItem('isAdmin')).toBe('false');
  });

  test('handles failed login', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Войти'));

    expect(global.alert).toHaveBeenCalledWith('Неверные данные для входа');
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
    expect(localStorage.getItem('isAdmin')).toBeNull();
  });

  test('validates required fields', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Войти'));

    expect(screen.getByLabelText('Email:')).toBeRequired();
    expect(screen.getByLabelText('Пароль:')).toBeRequired();
  });
});
