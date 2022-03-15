import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import logo from "../../images/logo.svg";
import { useValidationForm } from "../../utils/formValidation";

function Register(props) {
  const { values, handleErrors, errors } = useValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(e, values.name, values.email, values.password);
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs-container">
          <NavLink className="header__logo login__logo" to="/">
            <img src={logo} alt="Логотип проекта" />
          </NavLink>
          <h2 className="login__title">Добро пожаловать!</h2>

          <section className="login__inputs">
            <div className={"login__inputs-block"}>
              <label htmlFor="name" className="login__label">
                Имя
              </label>
              <input
                className="login__input-text"
                placeholder="Имя"
                type="text"
                name="name"
                value={values.name || ""}
                onChange={handleErrors}
                required
              ></input>
              <span className="login__text-error">{errors.name}</span>
            </div>

            <div className={"login__inputs-block"}>
              <label htmlFor="email" className="login__label">
                E-mail
              </label>
              <input
                className="login__input-text"
                placeholder="E-mail"
                type="email"
                name="email"
                value={values.email || ""}
                onChange={handleErrors}
                required
              ></input>
              <span className="login__text-error">{errors.email}</span>
            </div>

            <div className={"login__inputs-block"}>
              <label htmlFor="password" className="login__label">
                Пароль
              </label>
              <input
                className="login__input-text"
                type="password"
                name="password"
                value={values.password || ""}
                onChange={handleErrors}
                placeholder="Пароль"
                required
              ></input>
              <span className="login__text-error">{errors.password}</span>
            </div>
          </section>
        </div>

        <section className="login__buttons">
          <button className="login__register-btn" type="submit">
          Зарегистрироваться
          </button>
          <p className="login__text">
          Уже зарегистрированы?
            <Link to="/signin" className="login__link">
            Войти
            </Link>
          </p>
        </section>
      </form>
    </section>
  );
}

export default Register;
