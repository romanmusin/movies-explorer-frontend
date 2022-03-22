import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ onClick, isChecked }) {
  return (
    <div className="filterCheckbox">
      <label className="filterCheckbox__switch">
        <input className={`filterCheckbox__checkbox ${isChecked ? '' : 'filterCheckbox__checkbox_unchecked'}`} type="checkbox" onClick={onClick}></input>
        <span className="filterCheckbox__slider"></span>
      </label>
      <label className="filterCheckbox__switch-description">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
