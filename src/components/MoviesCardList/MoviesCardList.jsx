import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  isEmpty,
  isSavedMovies,
  movies,
  onClickSave,
  savedMovies,
}) {
  if (isEmpty) {
    return null;
  }
  return (
    <ul className="moviesCardList">
      {movies.map((movie) => (
        <MoviesCard
          movie={movie}
          key={movie.id}
          onClickSave={onClickSave}
          isSavedMovies={isSavedMovies}
          savedMovies={savedMovies}
        />
      ))}
    </ul>
  )
}

export default MoviesCardList;
