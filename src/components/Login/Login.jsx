import React from "react";
import LoginForm from '../LoginForm/LoginForm'

function Login({ onLogin }) {
  function handleSubmitForm(values) {
    onLogin(values);
  }

  return (
    <LoginForm
      name="login"
      title="Рады видеть!"
      buttonValue="Войти"
      text="Ещё не зарегистрированы? "
      linkText="Регистрация"
      onSubmitForm={handleSubmitForm}
    />
  );
}

export default Login;
