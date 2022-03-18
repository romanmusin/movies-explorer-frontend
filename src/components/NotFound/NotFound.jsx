import React from "react";
import {useHistory} from "react-router-dom";

import './NotFound.css';

function NotFound() {
  const history = useHistory();

  function handleClickGoBack() {
    history.goBack();
  }
  return (
    <section className="notFound">
      <p className="notFound__code">404</p>
      <p className="notFound__text">Страница не найдена</p>
      <button onClick={handleClickGoBack} className="notFound__back-btn">
        Назад
      </button>
    </section>
  );
}

export default NotFound;