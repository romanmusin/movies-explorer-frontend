import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useFormWithValidation } from '../../utils/formValidation';

function SearchForm(props) {
  const [searchInput, setSearchInput] = React.useState('');
  //const [isSearchFormValid, setIsSearchFormValid] = React.useState(true);

  function handleChange(e) {
    setSearchInput(e.target.value);
    //setIsSearchFormValid(e.target.checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();
    props.handleSearchMovies(searchInput);
  }

  function onSubmitSavedMovies(e) {
    e.preventDefault();
    props.handleSearchSavedMovies(searchInput);
  }
  
  return (
    <form
      className="searchForm"
      onSubmit={props.isSavedMovies ? onSubmitSavedMovies : onSubmit}
    >
      <div className="searchForm__search-block">
        <div className="searchForm__box">
          <span className="search-icon"></span>
          <input
            name="search"
            className="searchForm__search"
            type="text"
            placeholder="Фильм"
            onChange={handleChange}
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

        <FilterCheckbox handleShortMovies={props.handleShortMovies} isShortMovies={props.isShortMovies} />
      </div>
      <hr className="main__line_footer" />
    </form>
  );
}

export default SearchForm;
