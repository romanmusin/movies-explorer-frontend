const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(new Error(`Error: ${res.status}`));
  }
  return res.json();
};

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  register = (name, email, password) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
      .then(handleResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  authorize = (email, password) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
      .then(handleResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  getContent = (token) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
      .then(handleResponse)
      .then(data => {
        return data;
      })
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(handleResponse)
      .then(data => {
        return data
      })
  }

  editProfile(name, email) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name, email})
    })
      .then(handleResponse);
  }

  saveMovie(movieInfo) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movieInfo.country,
        director: movieInfo.director,
        duration: movieInfo.duration,
        year: movieInfo.year,
        description: movieInfo.description,
        image: movieInfo.image,
        trailer: movieInfo.trailer,
        nameRU: movieInfo.nameRU,
        nameEN: movieInfo.nameEN,
        thumbnail: movieInfo.thumbnail,
        movieId: movieInfo.movieId,
      })
    })
      .then(handleResponse);
  }

  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies/`, {
      headers: this.headers
    })
      .then(handleResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(handleResponse);
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.moviex.nomoredomains.work',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});