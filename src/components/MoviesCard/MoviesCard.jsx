import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
 const url = 'https://api.nomoreparties.co';

  const [isSaved, setIsSaved] = React.useState(false);
  const imageUrl = isSaved === true ? props.movie.image : url + props.movie.image.url;

  const film = {
    country: props.movie.country || 'Не указано',
    director: props.movie.director || 'Не указано',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'Не указано',
    description: props.movie.description || 'Не указано',
    image: `${props.movie.image === null ? `${''}` : `https://api.nomoreparties.co${props.movie.image?.url}`}`,
    trailer: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || 'Не указано',
    nameEN: props.movie.nameEN || 'Не указано',
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
    movieId: props.movie.id,
  }

  const isLikedMovie = React.useCallback(() => {
    if (localStorage.getItem('savedMovies')) {
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      if (savedMovies.some(movie => movie.nameRU === props.movie.nameRU)) {
        setIsSaved(true);
      }
    }
  }, [props.movie.nameRU])

  function handleSaveMovie() {
    props.handleSaveMovie(film);
    setIsSaved(true);
  }

  function handleDeleteMovie() {
    setIsSaved(false);
    props.handleDeleteMovie(props.movie._id);
  }

  function handleDislikeMovie() {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const card = savedMovies.find(movie => movie.nameRU === props.movie.nameRU);
    props.handleDeleteMovie(card._id);
    setIsSaved(false);
  }

  React.useEffect(() => {
    isLikedMovie();
  }, [isLikedMovie]);


  return (
    <li className="moviesCard">
      <div className="moviesCard__title-box">
        <p className="moviesCard__title">{props.movie.nameRU}</p>
        <p className="moviesCard__time">{props.movie.duration} мин</p>
      </div>
      <a
        href={props.isSavedMovies ? props.movie.trailer : props.movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="moviesCard__image-link"
      >
        <img
          className="moviesCard__image"
          src={props.isSavedMovies ? props.movie.image : film.image}
          //src={imageUrl}
          alt={props.movie.nameRU}
        ></img>
      </a>
      {/* <button className={isSavedBtn} type="button" onClick={handleClickOnSave}>
        {isSaved ? "" : "Сохранить"}
      </button> */}
      {props.isSavedMovies ?
          <button type='button' className='moviesCard__button-save moviesCard__button-save_delete' onClick={handleDeleteMovie}/>
          : <button type='button' className={`${isSaved ? 'moviesCard__button-save moviesCard__button-save_saved' : 'moviesCard__button-save'}`}
                    onClick={!isSaved ? handleSaveMovie : handleDislikeMovie}>{!isSaved && 'Сохранить'}</button>}
    </li>
  );
}

export default MoviesCard;
