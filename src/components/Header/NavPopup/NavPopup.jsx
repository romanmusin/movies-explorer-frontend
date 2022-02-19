import React from "react";
import "./NavPopup.css";

function NavPopup({ popupOpened, children, onClose }) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup_opened")) {
      onClose();
    }
  }

  return (
    <section
      className={`popup ${popupOpened ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      {children}
    </section>
  );
}

export default NavPopup;
