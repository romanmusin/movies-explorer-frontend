import React from "react";
import "./Promo.css";
import globe from "../../../images/promo_globe.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__title-container">
        <div className="promo__text-container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>

        <img src={globe} alt="" className="promo__image" />
      </div>
      <a href="#aboutProject" className="promo__btn">
        Узнать больше
      </a>
    </section>
  );
}

export default Promo;
