import React from "react";
import LoginForm from '../LoginForm/LoginForm';

import './Login.css';

function Login() {
  return (
    <LoginForm
      name="login"
      title="Рады видеть!"
      buttonValue="Войти"
      text="Ещё не зарегистрированы? "
      linkText="Регистрация"
    />
  );
}

export default Login;