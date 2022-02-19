import React from "react";
import "./MoviesCard.css";

function MoviesCard({ isSavedMovies, isOnSaved }) {
  return (
    <div className="moviesCard">
      <div className="moviesCard__title-box">
        <p className="moviesCard__title">Movie</p>
        <p className="moviesCard__time">110 минут</p>
      </div>
      <a
        href="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80"
        target="_blank"
        rel="noreferrer"
        className="moviesCard__image-link"
      >
        <img
          className="moviesCard__image"
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80"
          alt="promo"
        ></img>
      </a>
      <button
        className={`moviesCard__button-save ${
          isSavedMovies && !isOnSaved ? "moviesCard__button-save_saved" : ""
        }
          ${
            isOnSaved === true ? "moviesCard__button-save_delete" : ""
          }`}
        type="button"
      >
        {isSavedMovies ? "" : "Сохранить"}
      </button>
    </div>
  );
}

export default MoviesCard;
