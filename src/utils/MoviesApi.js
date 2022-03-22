const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(new Error(`Error: ${res.status}`));
  }
  return res.json();
};

class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getMovies() {
    return fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(handleResponse)
      .then((data) => {
        localStorage.setItem('movies', JSON.stringify(data));
        return data;
      });
  }
}

const MoviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default MoviesApi;