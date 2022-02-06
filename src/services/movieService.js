import http from "./httpService";
import config from "../config.json";

export function getMovies() {
  return http.get(config.movieEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(`${config.movieEndpoint}/${movieId}`);
}

export function getMovie(movieId) {
  return http.get(`${config.movieEndpoint}/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`${config.movieEndpoint}/${movie._id}`, body);
  }
  return http.post(`${config.movieEndpoint}`, movie);
}
