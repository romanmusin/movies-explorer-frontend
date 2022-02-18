import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSavedMovies, isOnSaved }) {
  return (
    <>
      <ul className="moviesCardList">
        <MoviesCard isSavedMovies={isSavedMovies} isOnSaved={isOnSaved}/>
        <MoviesCard isSavedMovies={true} isOnSaved={isOnSaved}/>
        <MoviesCard isSavedMovies={isSavedMovies} isOnSaved={isOnSaved}/>
        <MoviesCard isSavedMovies={true} isOnSaved={isOnSaved}/>
        <MoviesCard isSavedMovies={true} isOnSaved={isOnSaved}/>
        <MoviesCard isSavedMovies={isSavedMovies} isOnSaved={isOnSaved}/>
      </ul>
    </>
  );
}

export default MoviesCardList;