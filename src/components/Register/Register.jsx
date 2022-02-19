import React from "react";
import LoginForm from '../LoginForm/LoginForm';

import './Register.css';

function Register() {
  return (
    <LoginForm
      name="register"
      title="Добро пожаловать!"
      buttonValue="Зарегистрироваться"
      text="Уже зарегистрированы? "
      linkText="Войти"
    />
  );
}

export default Register;