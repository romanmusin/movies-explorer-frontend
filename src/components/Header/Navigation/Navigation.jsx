import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import "../Header.css";
import NavPopup from "../NavPopup/NavPopup";

function Navigation() {
  const [navOpened, setNavOpened] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const handleWindowResize = () => {
    if (window.innerWidth > 768) {
      setIsMobile(false);
      setNavOpened(false);
    } else {
      setIsMobile(true);
    }
  };

  React.useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function handleMenuOpen() {
    if (isMobile) {
      setNavOpened(!navOpened);
    }
  }

  return (
    <>
      <NavPopup popupOpened={navOpened} />
      <button
        className={`navigation__btn ${
          isMobile ? "navigation__btn_enabled" : ""
        } `}
        type="button"
        onClick={handleMenuOpen}
      />
      <nav
        className={`navigation ${isMobile ? "navigation_mobile" : ""} ${
          navOpened ? "navigation_mobile_opened" : ""
        }`}
      >
        <button
          className={`navigation__close-btn ${
            isMobile ? "navigation__close-btn_enabled" : ""
          } `}
          type="button"
          onClick={handleMenuOpen}
        />
        <div
           className={`navigation__links-container ${
             navOpened ? "navigation__links-container_mobile" : ""
           }`}
        >
          <Link
            className={`navigation__link ${
              isMobile ? "navigation__link_mobile" : "navigation__link_disabled"
            } `}
            to="/"
            onClick={handleMenuOpen}
          >
            Главная
          </Link>
          <Link
            className={`navigation__link ${
              isMobile ? "navigation__link_mobile" : ""
            } `}
            to="/movies"
            onClick={handleMenuOpen}
          >
            Фильмы
          </Link>
          <Link
            className={`navigation__link ${
              isMobile ? "navigation__link_mobile" : ""
            } `}
            to="/saved-movies"
            onClick={handleMenuOpen}
          >
            Сохранённые фильмы
          </Link>
        </div>

        <Link
          className={`navigation__link-profile ${
            isMobile ? "navigation__link_mobile" : ""
          } `}
          to="/profile"
          onClick={handleMenuOpen}
        >
          Аккаунт
        </Link>
      </nav>
    </>
  );
}

export default Navigation;
