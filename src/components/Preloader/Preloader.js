import React from "react";
import "./Preloader.css";
import Popup from "../Popup/Popup";

const Preloader = ({ isLoading }) => {
  return (
    <>
      <Popup popupOpened={isLoading} />
      <div className={`preloader ${isLoading ? 'preloader_enabled' : ''}`}>
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    </>
  );
};

export default Preloader;
