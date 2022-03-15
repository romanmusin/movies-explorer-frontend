import React from "react";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Preloader from "../Preloader/Preloader";


function Movies({isLoading, ...props}) {

  return (
    <>
      <Preloader isLoading={isLoading} />
      <SearchForm
        handleSearchMovies={props.handleSearchMovies}
        isShortMovies={props.isShortMovies}
        handleShortMovies={props.handleShortMovies}
      />

      <MoviesCardList
       isLoading={isLoading}
       movies={props.movies}
       moviesError={props.moviesError}
       notFound={props.notFound}
       handleSaveMovie={props.handleSaveMovie}
       handleDeleteMovie={props.handleDeleteMovie}
      />
    </>
  );
}

export default Movies;
