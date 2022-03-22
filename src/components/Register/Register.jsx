import React from "react";
import LoginForm from "../LoginForm/LoginForm";

function Register({ onRegister }) {
  function handleSubmitForm(values) {
    onRegister(values);
  }

  return (
    <LoginForm
      name="register"
      title="Добро пожаловать!"
      buttonValue="Зарегистрироваться"
      text="Уже зарегистрированы? "
      linkText="Войти"
      onSubmitForm={handleSubmitForm}
    />
  );
}

export default Register;
