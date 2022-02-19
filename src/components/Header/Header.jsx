import React from "react";
import logo from "../../images/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import "./Navigation/Navigation.css";

function Header({ children, isPromo }) {
  /*const [isMobile, setIsMobile] = React.useState(false);
  const [navOpened, setNavOpened] = React.useState(false);

  const handleWindowResize = () => {
    if (window.innerWidth > 768) {
      setIsMobile(false);
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
  }, []);*/

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
