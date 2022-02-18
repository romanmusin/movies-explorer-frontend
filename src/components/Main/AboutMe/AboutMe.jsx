import React from "react";
import "./AboutMe.css";
import "../Main.css";
import photo from "../../../images/photo.png";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="main__title">Студент</h2>
      <hr className="main__line" />
      <div className="aboutMe__resume">
        <p className="resume__name">Роман</p>
        <p className="resume__profession">Фронтенд-разработчик, 22 года</p>
        <p className="resume__about">
          Я родился и живу в небольшом городе Альметьевск, закончиваю факультет прикладной информатики КНИТУ-КАИ. Я пишу музыку, а ещё увлекаюсь хоккеем.
          Изучаю и развиваюсь в Фронтенд-разработке уже год. Работаю системным администратором в компании «ТатИнтек».
          После окончания обучения на курсе по веб-разработке планирую работать фронтенд-разработчиком.
        </p>
        <img className="resume__image" src={photo} alt="Фото студента"></img>
        <ul className="resume__links">
          <li className="resume__links-item">
            <a
              className="resume__link"
              href="https://github.com/romanmusin"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li className="resume__links-item">
            <a
              className="resume__link"
              href="https://vk.com/moonrain9"
              rel="noreferrer"
              target="_blank"
            >
              ВКонтакте
            </a>
          </li>
        </ul>
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
