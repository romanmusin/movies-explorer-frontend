import "./App.css";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";

function App() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  /* Отображение прелоадера */
  const [isLoading, setIsLoading] = useState(false);

  /* Переменная залогинености пользователя */
  const [loggedIn, setLoggedIn] = useState(null);

  /* Переменные для обработки ошибок */
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [statusRequest, setStatusRequest] = useState(false);
  const [message, setMessage] = useState("");

  /* Функция обработки ошибок */
  function handleErrors(response) {
    if (response) {
      setMessage(response);
    } else {
      setMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
    }
    setIsInfoPopupOpen(true);
  }

  function getData() {
    Promise.all([mainApi.getUser(), mainApi.getSavedMovies()])
      .then(([userData, moviesData]) => {
        setTimeout(() => {
          if (!userData || !moviesData) {
            handleErrors();
            setIsLoading(false);
          }
        }, 12000);
        setCurrentUser(userData.user);
        setSavedMovies(
          moviesData.movies
            .reverse()
            .filter((movie) => movie.owner === userData.user._id)
        );
        setIsLoading(false);
      })
      .catch((err) => {
        handleErrors(err.status);
        setIsLoading(false);
      });
  }

  async function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      await mainApi
        .getContent(token)
        .then((res) => {
          if (res.message) {
            setLoggedIn(false);
            history.push("/signin");
            setIsLoading(false);
          } else {
            getData();
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          history.push("/signin");
          setLoggedIn(false);
          setIsLoading(false);
          handleErrors(err.status);
        });
    } else {
      history.push("/");
      setLoggedIn(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    tokenCheck();
  }, []);

  function closeInfoPopup() {
    if (statusRequest) {
      setIsInfoPopupOpen(false);
      history.push("/signin");
    } else {
      setIsInfoPopupOpen(false);
    }
  }

  function handleSubmitLogin(values) {
    const { email, password } = values;
    setIsLoading(true);

    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          getData();
          history.push("/movies");
        }
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        handleErrors(err.status);
        setIsLoading(false);
      });
  }

  function handleSubmitRegister(values) {
    const { name, email, password } = values;
    setIsLoading(true);

    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res.message) {
          handleErrors(res.message);
        } else {
          setCurrentUser({ name, email });
          handleSubmitLogin({ email, password });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        handleErrors(err.status);
        setIsLoading(false);
      });
  }

  function handleUpdateUser(values) {
    const { name, email } = values;
    setIsLoading(true);
    setMessage("");

    return mainApi
      .updateUser(name, email)
      .then((res) => {
        if (res.message) {
          setMessage(res.message);
          setStatusRequest(false);
        } else {
          setCurrentUser(res.user);
          setStatusRequest(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function deleteMovie(movieId) {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((el) => el._id !== movieId));
      })
      .catch((err) => {
        handleErrors(err.status);
        setIsLoading(false);
      });
  }

  function saveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie.movie, ...savedMovies]);
      })
      .catch((err) => {
        handleErrors(err.status);
        setIsLoading(false);
      });
  }

  function handleSaveMovie(movie, isSaved, isSavedMovies) {
    if (isSaved && isSavedMovies === false) {
      const movieId = savedMovies.find((el) => el.movieId === movie.id)._id;
      deleteMovie(movieId);
    } else if (isSavedMovies === true) {
      const movieId = movie._id;
      deleteMovie(movieId);
    } else {
      saveMovie(movie);
    }
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.clear();
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path={["/movies", "/saved-movies", "/profile"]}>
            <Header isLogged={loggedIn} isPromo={false}>
              <ProtectedRoute
                exact
                path={["/movies", "/saved-movies", "/profile"]}
                component={Navigation}
                loggedIn={loggedIn}
              />
            </Header>
          </Route>
          <Route exact path={"/"}>
            <Header isLogged={loggedIn} isPromo={true}>
              {loggedIn === false ? <HeaderPromo /> : <Navigation />}
            </Header>
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect push to="/" />
            ) : (
              <Register onRegister={handleSubmitRegister} />
            )}
          </Route>
          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect push to="/" />
            ) : (
              <Login onLogin={handleSubmitLogin} />
            )}
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onShowError={handleErrors}
            onClickSave={handleSaveMovie}
            history={history}
            savedMovies={savedMovies}
            handleErrors={handleErrors}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            onClickSave={handleSaveMovie}
            history={history}
            savedMovies={savedMovies}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdateUser={handleUpdateUser}
            message={message}
            status={statusRequest}
            onSignOut={handleSignOut}
            history={history}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Route exact path={['/movies', '/saved-movies', '/']}>
          <Footer />
        </Route>
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeInfoPopup}
          message={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
