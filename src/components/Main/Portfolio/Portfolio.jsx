import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/link-arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <a
          className="portfolio__list-link"
          href="https://romanmusin.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
        >
          <li className="portfolio__list-item">Статичный сайт</li>
          <img src={arrow} alt="ссылка" className="portfolio__link-arrow" />
        </a>
        <a
          className="portfolio__list-link"
          href="https://romanmusin.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
        >
          <li className="portfolio__list-item">Адаптивный сайт</li>
          <img src={arrow} alt="ссылка" className="portfolio__link-arrow" />
        </a>
        <a
          className="portfolio__list-link"
          href="https://romus.mesto.nomoredomains.work"
          target="_blank"
          rel="noreferrer"
        >
          <li className="portfolio__list-item">Одностраничное приложение</li>
          <img src={arrow} alt="ссылка" className="portfolio__link-arrow" />
        </a>
      </ul>
    </section>
  );
}

export default Portfolio;
