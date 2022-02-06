import { createAction, createReducer } from "@reduxjs/toolkit";
import * as fields from "./constants";

export const movieAdded = createAction("movieAdded");
export const movieRemoved = createAction("movieRemoved");
export const movieUpdated = createAction("movieUpdated");
export const moviesLoaded = createAction("moviesLoaded");
export const genresLoaded = createAction("genresLoaded");
export const genreSelected = createAction("genreSelected");
export const columnSortedBy = createAction("columnSortedBy");
export const moviesfilteredBy = createAction("moviesfilteredBy");
export const pageSelected = createAction("pageSelected");
export const userLoggedIn = createAction("userLoggedIn");

export default createReducer(
  {
    [fields.CURRENT_USER]: {},
    [fields.MOVIES]: [],
    [fields.GENRES]: [],
    [fields.CURRENT_PAGE]: 1,
    [fields.SELECTED_GENRE]: null,
    [fields.SORT_COLUMN]: {},
    [fields.SEARCH_QUERY]: "",
  },
  {
    [movieAdded.type]: (state, action) => {
      state[action.payload.field].push(action.payload.data);
    },
    [movieRemoved.type]: (state, action) => {
      const { field, data } = action.payload;
      const filtered = state[field].filter((movie) => movie._id !== data._id);
      state[field] = filtered;
    },
    [movieUpdated.type]: (state, action) => {
      const { field, data } = action.payload;
      const updated = state[field].map((movie) =>
        movie._id === data._id ? data : movie
      );
      state[field] = updated;
    },
    [moviesLoaded.type]: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    [genresLoaded.type]: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    [genreSelected.type]: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    [columnSortedBy.type]: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    [userLoggedIn.type]: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    [moviesfilteredBy.type]: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    [pageSelected.type]: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
  }
);
