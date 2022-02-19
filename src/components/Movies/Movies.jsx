import React from "react";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import MoreBtn from '../MoreBtn/MoreBtn';
// import Preloader from '../Preloader/Preloader';

function Movies() {
  const isLoading = false;

  return (
    <>
      {/* <Preloader isLoading={!isLoading} /> */}
      <SearchForm />

      <MoviesCardList isLoading={isLoading} />
      <MoreBtn />
    </>
  );
}

export default Movies;
