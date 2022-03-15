import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import logo from "../../images/logo.svg";
import { useValidationForm } from "../../utils/formValidation";

function Login(props) {
  const { values, handleErrors, errors} = useValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(e, values.email, values.password);
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs-container">
          <NavLink className="header__logo login__logo" to="/">
            <img src={logo} alt="Логотип проекта" />
          </NavLink>
          <h2 className="login__title">Рады видеть!</h2>

          <section className="login__inputs">
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
              <span className='login__text-error'>{errors.password}</span>
            </div>
          </section>
        </div>

        <section className="login__buttons">
          <button className="login__register-btn" type="submit">
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__link">
              Регистрация
            </Link>
          </p>
        </section>
      </form>
    </section>
  );
}

export default Login;
