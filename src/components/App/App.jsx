import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import HeaderPromo from "../Header/HeaderPromo/HeaderPromo";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Navigation from "../Header/Navigation/Navigation";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {
  const loggedIn = true;
  return (
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
            <ProtectedRoute
              exact
              path={"/"}
              component={HeaderPromo}
              loggedIn={loggedIn}
            />
          </Header>
        </Route>
      </Switch>

      <Switch>
        <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} />
        <ProtectedRoute
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
        />
        <Route exact path="/">
          <Main />
        </Route>
        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
        />
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>

      <Route exact path={["/movies", "/saved-movies", "/"]}>
        <Footer />
      </Route>
    </div>
  );
}

export default App;
