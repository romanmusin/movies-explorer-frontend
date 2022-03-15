import { useContext, useRef, useState } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import { useValidationForm } from "../../utils/formValidation";

function Profile(props) {
  const value = useContext(AppContext);
  
  const [isEdit, setIsEdit] = useState(false);

  
  function handleOnEdit() {
    setIsEdit(!isEdit);
  }

  const { values, handleErrors, errors, isValid } = useValidationForm();

  const inputRef = useRef();

  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(
      e,
      values.name || currentUser.name,
      values.email || currentUser.email
    );
    setIsEdit(false);
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <div>
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <div className="profile__inputs-container">
            <label htmlFor="password" className="profile__label">
              Имя
            </label>
            <input
              name="name"
              className="profile__input"
              type="text"
              onChange={handleErrors}
              autoComplete="off"
              ref={inputRef}
              minLength="3"
              placeholder="Имя"
              defaultValue={currentUser.name}
              //disabled={!isEdit}
              required
            ></input>
            
          </div>
          <span className="login__text-error">
              {errors.name}
            </span>
          <div className="profile__inputs-container">
            <label htmlFor="password" className="profile__label">
              E-mail
            </label>
            <input
              name="email"
              className="profile__input"
              type="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              ref={inputRef}
              onChange={handleErrors}
              autoComplete="off"
              //disabled={!isEdit}
              required
            ></input>
          </div>
          <span className='login__text-error'>{errors.email}</span>
        </div>
        <div>
          {/* <button
            className="profile__submit-btn"
            type="submit"
          >
            Редактировать
          </button> */}

          {isEdit ? (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isValid}
              className={`profile__submit-btn ${
                !isValid && "profile__submit-btn_disabled"
              }`}
            >
              Сохранить
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOnEdit}
              className="profile__submit-btn"
            >
              Редактировать
            </button>
          )}

          {/* <Link to="/" className="profile__logout-btn">
            Выйти из аккаунта
          </Link> */}
          <button type="button" onClick={value.signOut} className='profile__logout-btn'>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
