import React from "react";
import "./AboutProject.css";
import "../Main.css";

function AboutProject() {
  return (
    <section id="aboutProject" className="aboutProject">
      <h2 className="main__title">О проекте</h2>
      <hr className="main__line" />
      <div className="aboutProject__text-container">
        <h3 className="aboutproject__subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <h3 className="aboutproject__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="aboutProject__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="aboutProject__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="aboutProject__bar">
        <div className="aboutProject__bar_item">
          <p id="first" className="aboutProject__bar_title">
            1 неделя
          </p>
          <p className="aboutProject__bar_subtitle">Back-end</p>
        </div>
        <div className="aboutProject__bar_item">
          <p id="second" className="aboutProject__bar_title">
            4 недели
          </p>
          <p className="aboutProject__bar_subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
