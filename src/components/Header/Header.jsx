import React from "react";
import logo from "../../images/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import "./Navigation/Navigation.css";

function Header({ children, isPromo }) {
  
  return (
    <header className={`header ${isPromo ? "header_promo" : ""}`}>
      <Link to="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>
      
      {children}
    </header>
  );
}

export default Header;
