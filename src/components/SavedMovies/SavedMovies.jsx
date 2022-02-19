import React from "react";
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <section className="savedMovies">
      <SearchForm />
      <MoviesCardList isSavedMovies={true} isOnSaved={true} />
    </section>
  );
}

export default SavedMovies;