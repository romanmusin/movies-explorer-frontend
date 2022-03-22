export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.moviex.nomoredomains.work' : 'http://localhost:5000';

export const register = (name, email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    password,
  }),
})
  .then((res) => res.json());

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
  }),
})
  .then((response) => response.json())
  .then((res) => {
    if (res) {
      localStorage.setItem('token', res.token);
      return res;
    }
    return null;
  });

export const getUser = () => fetch(`${BASE_URL}/users/me`, {
  headers: {
    method: 'GET',
    authorization: localStorage.getItem('token'),
  },
})
  .then((res) => res.json());

export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());

export const updateUser = (name, email) => fetch(`${BASE_URL}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
  }),
})
  .then((res) => res.json());

export const getSavedMovies = () => fetch(`${BASE_URL}/movies`, {
  method: 'GET',
  headers: {
    authorization: localStorage.getItem('token'),
  },
})
  .then((res) => res.json());

export const saveMovie = (movie) => fetch(`${BASE_URL}/movies`, {
  method: 'POST',
  headers: {
    authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    country: movie.country ? movie.country : 'Неизвестно',
    description: movie.description ? movie.description : 'Нет описания',
    director: movie.director ? movie.director : 'Неизвестно',
    duration: movie.duration ? movie.duration : 0,
    image: movie.image.url
      // eslint-disable-next-line no-undef
      ? `https://api.nomoreparties.co${movie.image.url}` : iconMovie,
    nameEN: movie.nameEN ? movie.nameEN : 'Неизвестно',
    nameRU: movie.nameRU ? movie.nameRU : 'Неизвестно',
    trailer: movie.trailerLink
      ? movie.trailerLink
      : `https://www.youtube.com/results?search_query=трейлер+${movie.nameRU}`,
    year: movie.year ? movie.year : 'Неизвестно',
    thumbnail: movie.image.formats.thumbnail.url
      // eslint-disable-next-line no-undef
      ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` : iconMovie,
    movieId: movie.id,
  }),
})
  .then((res) => res.json());

export const deleteMovie = (movieId) => fetch(`${BASE_URL}/movies/${movieId}`, {
  method: 'DELETE',
  headers: {
    authorization: localStorage.getItem('token'),
  },
})
  .then((res) => res.json());