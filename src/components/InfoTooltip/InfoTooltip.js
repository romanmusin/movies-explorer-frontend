import React from 'react';
import Popup from '../Popup/Popup';

import './InfoTooltip.css';

function InfoPopup({
  isOpen, onClose, message,
}) {
  return (
    <Popup popupOpened={isOpen} onClose={onClose} >
      <div className="infoPopup">
        <button
          type="reset"
          className="infoPopup__close-btn"
          aria-label="close"
          onClick={onClose}
        ></button>
        <div className='infoPopup__error'></div>
        <p className="infoPopup__title popup__title_info">{message}
        </p>
      </div>
      </Popup>
  );
}

export default InfoPopup;