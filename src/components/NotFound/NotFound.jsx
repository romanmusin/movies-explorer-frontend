import React from "react";
import { withRouter } from 'react-router-dom';

import './NotFound.css';

function NotFound({ onBack }) {
  return (
    <section className="notFound">
      <p className="notFound__code">404</p>
      <p className="notFound__text">Страница не найдена</p>
      <button onClick={onBack} className="notFound__back-btn">
        Назад
      </button>
    </section>
  );
}

export default withRouter(NotFound);