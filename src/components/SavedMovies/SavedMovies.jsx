import React from "react";
import SearchForm from "../SearchForm/SearchForm";

import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({isLoading, ...props}) {
 
  return (
    <section className="savedMovies">
      <SearchForm
        isShortMovies={props.isShortMovies}
        handleShortMovies={props.handleShortMovies}
        handleSearchSavedMovies={props.handleSearchSavedMovies}
        isSavedMovies={true}
      />
      <MoviesCardList
         isLoading={isLoading}
         isSavedMovies={true}
         movies={props.movies}
         handleDeleteMovie={props.handleDeleteMovie}
      />
    </section>
  );
}

export default SavedMovies;
