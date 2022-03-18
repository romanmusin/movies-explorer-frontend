import React, { useEffect, useState } from 'react';
import api from '../../utils/MoviesApi';
import filterMovies from '../../utils/FilterMovies';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoreBtn from '../MoreBtn/MoreBtn';
import Preloader from '../Preloader/Preloader';
import EmptyMoviesList from '../EmptyMoviesList/EmptyMoviesList';

import * as constant from '../../utils/constants';

function Movies({
  onShowError, onClickSave, savedMovies, handleErrors,
}) {
  const dataForSearch = JSON.parse(localStorage.getItem('data-for-search')) || {};
  const previousKey = dataForSearch.keys || '';

  const [allMovies, setAllMovies] = useState([]);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  const [isListEmpty, setIsListEmpty] = useState(false);
  const [moviesBlockText, setMoviesBlockText] = useState('');

  const [slice, setSlice] = useState({ start: 0, end: 12 });
  const [numberAddedMovies, setNumberAddedMovies] = useState(3);

  const [isEnabledBtn, setIsEnabledBtn] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [isCardsDisplaying, setIsCardsDisplaying] = useState(false);

  const handleWindowSize = () => {
    if (window.innerWidth > 1100) {
      setSlice(constant.RENDER_MOVIES_1100);
      setNumberAddedMovies(constant.ADD_MOVIES_DEFAULT);
    } else if (window.innerWidth > 700 && window.innerWidth <= 1100) {
      setSlice(constant.RENDER_MOVIES_700_1100);
      setNumberAddedMovies(constant.ADD_MOVIES_700_1100);
    } else if (window.innerWidth <= 700) {
      setSlice(constant.RENDER_MOVIES_700);
    }
  };

  // API
  const getAllMovies = (keys, checkbox) => api
    .getMovies()
    .then((movies) => {
      setTimeout(() => {
        if (!movies) {
          handleErrors();
          setIsLoading(false);
        }
      }, 12000);
      setAllMovies(movies);
      setFilteredMovies(filterMovies(movies, keys, checkbox));
      setIsLoading(false);
    })
    .catch((err) => {
      onShowError(err.status);
      setIsLoading(false);
    });

  const handleSearchMovies = (keys, checkbox) => {
    const data = { keys, checkbox };
    localStorage.setItem('data-for-search', JSON.stringify(data));
    setIsLoading(true);
    const arrayMovies = JSON.parse(localStorage.getItem('movies'));

    if (!arrayMovies && allMovies.length === 0) {
      getAllMovies(keys, checkbox);
    } else {
      setFilteredMovies(filterMovies(arrayMovies, keys, checkbox));
      setIsLoading(false);
    }
    return null;
  };

  const selectionFilms = (movies) => movies.slice(slice.start, slice.end);

  const showMoreMovies = () => {
    setSlice({ start: 0, end: slice.end + numberAddedMovies });
  };

  useEffect(() => {
    if (filteredMovies.length !== 0) {
      setSelectedMovies(filteredMovies.slice(slice.start, slice.end));
    }
  }, [slice]);

  useEffect(() => {
    handleWindowSize();

    if (filteredMovies.length !== 0) {
      setIsListEmpty(false);
      setSelectedMovies(selectionFilms(filteredMovies, slice));
      setIsCardsDisplaying(true);
    } else {
      setIsListEmpty(true);
      setMoviesBlockText('Мы ничего не нашли по вашему запросу');
    }
  }, [filteredMovies]);

  useEffect(() => {
    if (selectedMovies.length === filteredMovies.length) {
      setIsEnabledBtn(false);
    } else {
      setIsEnabledBtn(true);
    }
  }, [selectedMovies]);

  useEffect(() => {
    handleWindowSize();
    if (dataForSearch && Object.keys(dataForSearch).length !== 0) {
      const { keys, checkbox } = dataForSearch;
      setIsListEmpty(false);
      handleSearchMovies(keys, checkbox);
    } else {
      setIsListEmpty(true);
      setMoviesBlockText('Введите запрос в строку поиска');
      setIsCardsDisplaying(false);
    }
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <SearchForm
        handleSearch={handleSearchMovies}
        isRequired={true}
        isCardsDisplaying={isCardsDisplaying}
        previousKey={previousKey}
      />

      <MoviesCardList
        isEmpty={isListEmpty}
        isSavedMovies={false}
        movies={selectedMovies}
        onClickSave={onClickSave}
        savedMovies={savedMovies}
      />

      <MoreBtn
        isEmpty={isListEmpty}
        onMoreMovies={showMoreMovies}
        isEnabledBtn={isEnabledBtn}
      />

      <EmptyMoviesList isEmpty={isListEmpty} text={moviesBlockText} />
    </>
  );
}

export default Movies;
