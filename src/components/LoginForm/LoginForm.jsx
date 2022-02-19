import React from "react";
import { Link } from "react-router-dom";

import "./LoginForm.css";
import logo from "../../images/logo.svg";

function LoginForm({ name, title, buttonValue, text, linkText }) {
  
  return (
    <section className="login">
      <form className="login__form">
        <div className="login__inputs-container">
          <img
            className="header__logo login__logo"
            src={logo}
            alt="Логотип проекта"
            title="Логотип проекта"
          />
          <h2 className="login__title">{title}</h2>

          <section className="login__inputs">
            <div
              className={`login__inputs-block ${
                name === "login" ? "login__inputs-block_disabled" : ""
              }`}
            >
              <label htmlFor="name" className="login__label">
                Имя
              </label>
              <input
                className="login__input-text"
                type="text"
                id="name"
                placeholder="Имя"
                required
                formNoValidate
              ></input>
            </div>

            <div className={"login__inputs-block"}>
              <label htmlFor="email" className="login__label">
                E-mail
              </label>
              <input
                className="login__input-text"
                type="email"
                id="email"
                placeholder="E-mail"
                required
                formNoValidate
              ></input>
            </div>

            <div className={"login__inputs-block"}>
              <label htmlFor="password" className="login__label">
                Пароль
              </label>
              <input
                className="login__input-text signForm__input-text_error"
                type="password"
                id="password"
                placeholder="Пароль"
                required
                formNoValidate
              ></input>
              <span className="login__text-error">
                Что-то пошло не так...
              </span>
            </div>
          </section>
        </div>

        <section className="login__buttons">
          <button
            className="login__register-btn"
            type="submit"
            value="buttonValue"
          >
            {buttonValue}
          </button>
          <p className="login__text">
            {text}
            <Link
              to={`${name === "login" ? "/signup" : "/signin"}`}
              className="login__link"
            >
              {linkText}
            </Link>
          </p>
        </section>
      </form>
    </section>
  );
}

export default LoginForm;
