import React from "react";
import './Footer.css';
import '../Main/Main.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <hr className="main__line main__line_footer" />
      <div className="footer__links-container">
        <p className="footer__year">&copy;2022</p>
        <nav className="footer__nav">
          <a
            className="footer__nav-item"
            href="https://praktikum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__nav-item"
            href="https://github.com/romanmusin"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="footer__nav-item"
            href="https://vk.com/moonrain9"
            target="_blank"
            rel="noreferrer"
          >
            ВКонтакте
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;