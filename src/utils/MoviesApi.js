const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(new Error(`Error: ${res.status}`));
  }
  return res.json();
};

export const getMovies = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  })
    .then(handleResponse)
};
