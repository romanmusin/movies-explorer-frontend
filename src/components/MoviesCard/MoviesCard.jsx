import React, { useState, useEffect } from 'react';
import "./MoviesCard.css";

function MoviesCard({
  movie, onClickSave, isSavedMovies, savedMovies,
}) {
  const url = 'https://api.nomoreparties.co';

  const title = movie.nameRU.toString();
  const duration = movie.duration.toString();

  const imageUrl = isSavedMovies === true ? movie.image : url + movie.image.url;
  const trailer = isSavedMovies === true ? movie.trailer : movie.trailerLink;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSavedMovies) {
      setIsSaved(true);
    } else {
      setIsSaved(savedMovies.some((el) => el.movieId === movie.id));
    }
  }, [savedMovies]);

  function handleClickOnSave() {
    if (!isSavedMovies) {
      setIsSaved(!isSaved);
    }
    onClickSave(movie, isSaved, isSavedMovies);
  }

  const isSavedBtn = `moviesCard__button-save ${isSaved && isSavedMovies === false ? 'moviesCard__button-save_saved' : ''} ${isSavedMovies ? 'moviesCard__button-save_delete' : ''}`;


  return (
    <li className="moviesCard">
      <div className="moviesCard__title-box">
        <p className="moviesCard__title">{title}</p>
        <p className="moviesCard__time">{duration} мин</p>
      </div>
      <a
        href={trailer}
        target="_blank"
        rel="noreferrer"
        className="moviesCard__image-link"
      >
        <img
          className="moviesCard__image"
          
          src={imageUrl}
          alt={title}
        ></img>
      </a>
      <button className={isSavedBtn} type="button" onClick={handleClickOnSave}>
        {isSaved ? "" : "Сохранить"}
      </button>
      {/* {isSavedMovies ?
          <button type='button' className='moviesCard__button-save moviesCard__button-save_delete' onClick={handleDeleteMovie}/>
          : <button type='button' className={`${isSaved ? 'moviesCard__button-save moviesCard__button-save_saved' : 'moviesCard__button-save'}`}
                    onClick={!isSaved ? handleClickOnSave : handleDislikeMovie}>{!isSaved && 'Сохранить'}</button>} */}
    </li>
  );
}

export default MoviesCard;
