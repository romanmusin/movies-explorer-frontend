import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isLoading, ...props }) {
  const [initialCardsAmount, setInitialCardsAmount] = React.useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 5;
    } else if (size < 920) {
      return 8;
    } else if (size < 1279) {
      return 12;
    } else if (size > 1279) {
      return 12;
    }
  });

  const [addCardsAmount, setAddMoreCardsAmount] = React.useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 2;
    } else if (size < 920) {
      return 2;
    } else if (size < 1279) {
      return 3;
    } else if (size > 1279) {
      return 4;
    }
  });

  function handleResize() {
    const size = window.innerWidth;
    if (size < 720) {
      setInitialCardsAmount(5);
      setAddMoreCardsAmount(2);
    } else if (size < 920) {
      setInitialCardsAmount(8);
      setAddMoreCardsAmount(2);
    } else if (size < 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(3);
    } else if (size > 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(4);
    }
  }

  function handleAddMovies() {
    setInitialCardsAmount((prev) => prev + addCardsAmount);
  }

  const renderedMovies = props.movies.slice(0, initialCardsAmount);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* {isLoading && <Preloader/>} */}
      <span
        className={`movies-card-list__span ${
          !props.moviesError && "movies-card-list__span_hidden"
        }`}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен.
      </span>
      <span
        className={`movies-card-list__span ${
          !props.notFound && "movies-card-list__span_hidden"
        }`}
      >
        Ничего не найдено :c
      </span>
      <span
        className={`movies-card-list__span ${
          props.isSavedMovies && props.movies.length === 0
            ? ""
            : "movies-card-list__span_hidden"
        }`}
      >
        Вы ещё ничего не сохраняли
      </span>

      <section className="moviesCardList">
        {renderedMovies.map((movie) => {
          return (
            <MoviesCard
              key={props.isSavedMovies ? movie.movieId : movie.id}
              movie={movie}
              handleSaveMovie={props.handleSaveMovie}
              handleDeleteMovie={props.handleDeleteMovie}
              isSavedMovies={props.isSavedMovies}
            />
          );
        })}
      </section>

      <button
        className={`moviesCardList__btn ${
          props.movies.length === renderedMovies.length
            ? "moviesCardList__btn_disabled"
            : ""
        }`}
        onClick={handleAddMovies}
      >
        Ещё
      </button>
    </>
  );
}

export default MoviesCardList;
