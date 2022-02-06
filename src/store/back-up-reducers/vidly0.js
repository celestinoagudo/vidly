//action types
const MOVIE_ADDED = "movieAdded";
const MOVIE_REMOVED = "movieRemoved";
const MOVIE_UPDATED = "movieUpdated";
const MOVIES_LOADED = "moviesLoaded";
const GENRES_LOADED = "genresLoaded";
const GENRE_SELECTED = "genreSelected";
const COLUMN_SORTED_BY = "columnSortedBy";
const USER_LOGGED_IN = "userLoggedIn";
const MOVIES_FILTERED_BY = "moviesfilteredBy";
const PAGE_SELECTED = "pageSelected";

//state fields
const MOVIES = "movies";
const GENRES = "genres";
const CURRENT_PAGE = "currentPage";
const SELECTED_GENRE = "selectedGenre";
const SORT_COLUMN = "sortColumn";
const SEARCH_QUERY = "searchQuery";
const CURRENT_USER = "currentUser";

//action creators
export const movieAdded = (payload) => ({
  type: MOVIE_ADDED,
  payload: { ...payload, field: MOVIES },
});

export const movieRemoved = (payload) => ({
  type: MOVIE_REMOVED,
  payload: { ...payload, field: MOVIES },
});

export const movieUpdated = (payload) => ({
  type: MOVIE_UPDATED,
  payload: { ...payload, field: MOVIES },
});

export const moviesLoaded = (payload) => ({
  type: MOVIES_LOADED,
  payload: { ...payload, field: MOVIES },
});

export const genresLoaded = (payload) => ({
  type: GENRES_LOADED,
  payload: { ...payload, field: GENRES },
});

export const genreSelected = (payload) => ({
  type: GENRE_SELECTED,
  payload: { ...payload, field: SELECTED_GENRE },
});

export const columnSortedBy = (payload) => ({
  type: COLUMN_SORTED_BY,
  payload: { ...payload, field: SORT_COLUMN },
});

export const moviesfilteredBy = (payload) => ({
  type: MOVIES_FILTERED_BY,
  payload: { ...payload, field: SEARCH_QUERY },
});

export const pageSelected = (payload) => ({
  type: PAGE_SELECTED,
  payload: { ...payload, field: CURRENT_PAGE },
});

export const userLoggedIn = (payload) => ({
  type: USER_LOGGED_IN,
  payload: { ...payload, field: CURRENT_USER },
});

//reducer
export default function reducer(
  state = {
    [CURRENT_USER]: {},
    [MOVIES]: [],
    [GENRES]: [],
    [CURRENT_PAGE]: 1,
    [SELECTED_GENRE]: null,
    [SORT_COLUMN]: {},
    [SEARCH_QUERY]: "",
  },
  action
) {
  const { type } = action;
  const field = action.payload && action.payload.field;
  const data = action.payload && action.payload.data;

  switch (type) {
    case MOVIES_LOADED:
    case GENRES_LOADED:
    case GENRE_SELECTED:
    case COLUMN_SORTED_BY:
    case USER_LOGGED_IN:
    case MOVIES_FILTERED_BY:
    case PAGE_SELECTED: {
      return { ...state, [field]: data };
    }

    case MOVIE_ADDED: {
      return { ...state, [field]: [...state[field], data] };
    }

    case MOVIE_REMOVED: {
      const filtered = state[field].filter((movie) => movie._id !== data._id);
      return { ...state, [field]: [...filtered] };
    }

    case MOVIE_UPDATED: {
      const updated = state[field].map((movie) =>
        movie._id === data._id ? data : movie
      );
      return { ...state, [field]: [...updated] };
    }
    default: {
      return state;
    }
  }
}
