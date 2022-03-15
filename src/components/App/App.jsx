import "./App.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import HeaderPromo from "../Header/HeaderPromo/HeaderPromo";
import Navigation from "../Header/Navigation/Navigation";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { useCallback, useEffect, useState } from "react";
import {
  statusEditMessage,
  statusErrors,
  statusErrorText,
  statusLoadMessage,
  statusSuccessMessage,
} from "../../utils/constants";
import statusSuccessImage from "../../images/success.svg";
import statusErrorImage from "../../images/failed.svg";
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { mainApi } from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Стейт-переменная статус пользователя, вход в систему
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [moviesError, setMoviesError] = useState(false);
  const [apiMovies, setApiMovies] = useState([]);
  const [infoTooltip, setInfoTooltip] = useState({
    // Стейт информационного попапа статуса
    isOpen: false,
    image: statusSuccessImage,
    message: statusSuccessMessage,
  });
  const [currentUser, setCurrentUser] = useState({
    // Стейт данные текущего пользователя
    _id: "",
    name: "",
    email: "",
  });

  // Функция закрытия всех попапов
  const closePopup = useCallback(() => {
    setInfoTooltip({
      ...infoTooltip,
      isOpen: false,
    });
  }, [infoTooltip]);

  // Обработчик по кнопке Войти
  function handleLogin(e, email, password) {
    setIsLoading(true);
    mainApi
      .authorize(email, password)
      .then((data) => {
        setIsLoading(false);
        setInfoTooltip({ isOpen: false });
        setLoggedIn(true);
        setCurrentUser({ ...data });
        history.push("/movies");
      })
      .catch((err) => handleError(e.target, err)); // По указанным Логину и Паролю пользователь не найден. Проверьте введенные данные и повторите попытку.
  }

  // Обработчик ошибки по кнопке Войти
  function handleError(form, statusError) {
    const errors = statusErrors.filter((error) => error.name === form.name)[0]
      .errors;
    const statusErrorMessage = errors.filter(
      (error) => error.status === statusError
    )[0].message;
    setInfoTooltip({
      ...infoTooltip,
      isOpen: true,
      image: statusErrorImage,
      message: statusErrorMessage || statusErrorText,
    });
  }

  // Обработчик по кнопке Зарегистрироваться
  function handleRegister(evt, name, password, email) {
    setIsLoading(true);
    mainApi
      .register(name, password, email)
      .then((data) => {
        setCurrentUser({ ...data });
        setIsLoading(false);
        setInfoTooltip({
          ...infoTooltip,
          isOpen: true,
          image: statusSuccessImage,
          message: statusSuccessMessage,
        });
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => handleError(evt.target, err)); // Обработка ошибки handleError();
  }

  // // Обработчик обновления информации пользователя
  function handleUpdateUser(evt, name, email) {
    setIsLoading(true);
    mainApi
      .editProfile(name, email)
      .then((data) => {
        setCurrentUser({ ...data });
        setIsLoading(false);
        setInfoTooltip({
          ...infoTooltip,
          isOpen: true,
          image: statusSuccessImage,
          message: statusEditMessage,
        });
      })
      .catch((err) => handleError(evt.target, err));
  }

  // Проверка токена при повторном посещении сайта
  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({ ...res });
            history.push("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
        });
    } else {
      setLoggedIn(false);
    }
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  // Выход из аккаунта
  function signOut() {
    setLoggedIn(false);
    setCurrentUser({
      _id: "",
      name: "",
      email: "",
    });
    setApiMovies([]);
    setMovies([]);
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("movies");
    history.push("/");
  }

  function handleShortMovies(e) {
    setIsShortMovies(e.target.checked);
  }

  function searchMoviesByKeyword(movies, keyword) {
    let foundMovies = [];

    movies.forEach((movie) => {
      if (movie.nameRU.indexOf(keyword) > -1) {
        if (isShortMovies) {
          movie.duration <= 40 && foundMovies.push(movie);
        } else {
          foundMovies.push(movie);
        }
      }
    });
    return foundMovies;
  }

  function searchMovies(keyword) {
    setIsLoading(true);
    setMovies([]);
    setNotFound(false);
    setMoviesError(false);

    if (apiMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((resMovies) => {
          setApiMovies(resMovies);
          const searchResult = searchMoviesByKeyword(resMovies, keyword);

          if (searchResult.length === 0) {
            setNotFound(true);
            setMovies([]);
          } else {
            localStorage.setItem("movies", JSON.stringify(searchResult));
            setMovies(JSON.parse(localStorage.getItem("movies")));
          }
        })
        .catch(() => {
          setMoviesError(true);
          setMovies([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const searchResult = searchMoviesByKeyword(apiMovies, keyword);

      if (searchResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setNotFound(true);
      } else if (searchResult.length !== 0) {
        localStorage.setItem("movies", JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        setIsLoading(false);
      } else {
        setMoviesError(true);
        setMovies([]);
      }
    }
  }

  function searchSavedMovies(keyword) {
    const movies = JSON.parse(localStorage.getItem("savedMovies"));
    const searchResult = searchMoviesByKeyword(movies, keyword);
    setSavedMovies(searchResult);
  }

  function saveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((data) => {
        const movies = [...savedMovies, data];
        setSavedMovies((prev) => [...prev, data]);
        localStorage.setItem("savedMovies", JSON.stringify(movies));
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function deleteMovie(movieId) {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const filteredSavedMovies = savedMovies.filter((item) => {
          return item._id !== movieId;
        });
        setSavedMovies(filteredSavedMovies);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(filteredSavedMovies)
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // Загрузка данных пользователя
  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((data) => {
        setCurrentUser({ ...data });
      })
      .catch((err) => console.log(err));
  }, []);

  // Загрузка фильмов
  useEffect(() => {
    if (loggedIn) {
      const movies = localStorage.getItem("movies");
      const savedMovies = localStorage.getItem("savedMovies");
      if (movies) {
        setMovies(JSON.parse(movies));
      }
      if (savedMovies) {
        setSavedMovies(JSON.parse(savedMovies));
      } else {
        mainApi
          .getSavedMovies()
          .then((res) => {
            setSavedMovies(res);
            localStorage.setItem("savedMovies", JSON.stringify(res));
          })
          .catch((err) => console.log(err));
      }
    }
  }, [location, loggedIn]);

  return (
    <AppContext.Provider value={{ loggedIn, handleLogin, signOut }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
                handleError={handleError}
              />
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin} handleError={handleError} />
            </Route>
            <ProtectedRoute path="/profile">
              <Header isLogin={loggedIn} isPromo={false}>
                <Navigation />
              </Header>
              <Profile onUpdateUser={handleUpdateUser} />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies">
              <Header isLogin={loggedIn} isPromo={false}>
                <Navigation />
              </Header>
              <SavedMovies
                isLoading={isLoading}
                movies={savedMovies}
                moviesError={moviesError}
                notFound={notFound}
                handleSearchSavedMovies={searchSavedMovies}
                isShortMovies={isShortMovies}
                handleDeleteMovie={deleteMovie}
                handleShortMovies={handleShortMovies}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute path="/movies">
              <Header isLogin={loggedIn} isPromo={false}>
                <Navigation />
              </Header>
              <Movies
                isLoading={isLoading}
                moviesError={moviesError}
                notFound={notFound}
                handleSearchMovies={searchMovies}
                movies={movies}
                handleShortMovies={handleShortMovies}
                isShortMovies={isShortMovies}
                handleSaveMovie={saveMovie}
                handleDeleteMovie={deleteMovie}
              />
              <Footer />
            </ProtectedRoute>
            <Route exact path="/">
              <Header isLogin={loggedIn} isPromo={true}>
                {loggedIn ? <Navigation /> : <HeaderPromo />}
              </Header>
              <Main />
              <Footer />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip
            isOpen={infoTooltip.isOpen}
            isLoading={isLoading}
            onClose={closePopup}
            statusImage={infoTooltip.image}
            statusMessage={infoTooltip.message}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
