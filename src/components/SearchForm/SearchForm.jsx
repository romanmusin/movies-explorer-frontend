import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useState } from "react";
import { useFormWithValidation } from "../ValidationForm/ValidationForm";

function SearchForm({
  handleSearch,
  isRequired,
  isCardsDisplaying,
  previousKey,
}) {
  const [checked, setChecked] = useState(false);
  const [inputPrevious, setInputPrevious] = useState(previousKey);
  const [keys, setKeys] = useState("");

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (values.searchField && isValid) {
      setKeys(values.searchField.toLowerCase());
      handleSearch(values.searchField.toLowerCase(), checked);
    } else if (previousKey) {
      handleSearch(previousKey, checked);
    } else if (isValid) {
      handleSearch(keys, checked);
    }
  }

  function handleCheckbox() {
    setChecked(!checked);
    if (previousKey && isCardsDisplaying) {
      handleSearch(previousKey.toLowerCase(), !checked);
    } else if (previousKey) {
      handleSearch(previousKey, !checked);
    } else {
      handleSearch(keys, !checked);
    }
  }

  function handleInput(e) {
    setInputPrevious(e.target.value);
    handleChange(e);
    setKeys(e.target.value);
  }

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <div className="searchForm__search-block">
        <div className="searchForm__box">
          <span className="search-icon"></span>
          <input
            name="searchField"
            className="searchForm__search"
            type="text"
            placeholder="Фильм"
            onChange={handleInput}
            required={isRequired}
            value={inputPrevious || ""}
            disabled={false}
          ></input>

          <div className="searchForm__find-block">
            <button
              type="submit"
              className="searchForm__find-btn"
              value=""
            ></button>
          </div>
        </div>

        <hr className="searchForm__line-vert" />

        <FilterCheckbox onClick={handleCheckbox} isChecked={checked} />
      </div>
      <span className={"login__text-error searchForm__text-error"}>{errors.searchField}</span>
      <hr className="main__line_footer" />
    </form>
  );
}

export default SearchForm;
