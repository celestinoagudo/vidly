import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "entities",
  initialState: {
    movies: [],
    genres: [],
  },
  reducers: {
    movieAdded: (state, action) => {
      state.movies.push(action.payload.data);
    },
    movieRemoved: (state, action) => {
      const filtered = state.movies.filter(
        (movie) => movie._id !== action.payload.data._id
      );
      state.movies = filtered;
    },
    movieUpdated: (state, action) => {
      const { data } = action.payload;
      const updated = state.movies.map((movie) =>
        movie._id === data._id ? data : movie
      );
      state.movies = updated;
    },
    moviesLoaded: (state, action) => {
      state.movies = action.payload.data;
    },
    genresLoaded: (state, action) => {
      state.genres = action.payload.data;
    },
  },
});

export const getMoviesByTitle = (text) =>
  createSelector(
    (state) => state.entities.movies,
    (movies) =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(text.toLowerCase())
      )
  );

export const getMoviesByGenre = (selectedGenre) =>
  createSelector(
    (state) => state.entities.movies,
    (movies) => movies.filter((movie) => movie.genre._id === selectedGenre._id)
  );

//actions
export const {
  movieAdded,
  movieRemoved,
  movieUpdated,
  moviesLoaded,
  genresLoaded,
} = slice.actions;

export default slice.reducer;
