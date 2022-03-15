import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./LoginForm.css";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../utils/formValidation";
import { REG_EXP_PASSWORD, WEAK_PASSWORD } from "../../utils/constants";

function LoginForm({ name, title, buttonValue, text, linkText, onSubmitForm }) {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function onShowPassword() {
    setIsVisiblePassword(!isVisiblePassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      resetForm();
      onSubmitForm(values);
    }
  }

  function checkPasswordComplexity(e) {
    handleChange(e);
    const password = e.target.value;

    if (REG_EXP_PASSWORD.test(password) && password.length >= 8) {
      setPasswordStrength(3);
    } else if (REG_EXP_PASSWORD.test(password) || password.length >= 8) {
      setPasswordStrength(2);
    } else {
      setPasswordStrength(1);
    }
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
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
                className={`login__input-text ${errors.name ? 'login__input-text_error' : ''}`}
                type="text"
                id="name"
                onChange={handleChange}
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                pattern="^[a-zA-Zа-яёЁА-Я\s-]+$"
                required
              ></input>
              {errors.name && (
                <span className="login__text-error">{errors.name}</span>
              )}
            </div>

            <div className={"login__inputs-block"}>
              <label htmlFor="email" className="login__label">
                E-mail
              </label>
              <input
                className={`login__input-text ${errors.email ? 'login__input-text_error' : ''}`}
                type="email"
                id="email"
                placeholder="E-mail"
                onChange={handleChange}
                required
              ></input>
              {errors.email && (
                <span className="login__text-error">{errors.email}</span>
              )}
            </div>

            <div className={"login__inputs-block"}>
              <label htmlFor="password" className="login__label">
                Пароль
              </label>
              <input
                className={`login__input-text ${errors.password ? 'login__input-text_error' : ''}`}
                type={`${isVisiblePassword ? 'text' : 'password'}`}
                id="password"
                onChange={checkPasswordComplexity}
                placeholder="Пароль"
                required
              ></input>
              {errors.password && (
                <span className="login__text-error">{errors.password}</span>
              )}
              <span
                className={`login__text-password ${passwordStrength === 1 && !errors.password && name !== 'login'
                  ? 'password_weak'
                  : ''}`}
              >{`Сложность: слабый. `}
              </span>
              <span
                className={`login__text-password ${passwordStrength === 2 && !errors.password && name !== 'login'
                  ? 'password_middle'
                  : ''}`}
              >
                {`Сложность: средний. `}
              </span>
              <span
                className={`login__text-password ${passwordStrength === 3 && !errors.password && name !== 'login'
                  ? 'password_strong'
                  : ''}`}
              >
                Сложность: сильный.
              </span>
              <button
                className={`login__password_invisible ${isVisiblePassword ? 'login__password_visible' : ''}`}
                onClick={onShowPassword}
                type="button"
              />
            </div>
          </section>
        </div>

        <section className="login__buttons">
        <button
            className={`login__register-btn ${isValid ? '' : 'login__register-btn_disabled'}`}
            type="submit"
            value="buttonValue"
            disabled={!isValid}
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
