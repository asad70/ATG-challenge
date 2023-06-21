import { createStore, combineReducers } from "redux";

// Reducers
const favoriteMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FAVORITE_MOVIES":
      return action.payload;
    case "REMOVE_FAVORITE_MOVIE":
      return state.filter((movie) => movie.id !== action.payload);
    default:
      return state;
  }
};

const searchQueryReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return action.payload;
    default:
      return state;
  }
};

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    case "CLEAR_MOVIES":
      return [];
    default:
      return state;
  }
};

const isLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload;
    default:
      return state;
  }
};

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    case "CLEAR_ERROR":
      return null;
    default:
      return state;
  }
};

const favoritesCountReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_FAVORITES_COUNT":
      return action.payload;
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  favoriteMovies: favoriteMoviesReducer,
  searchQuery: searchQueryReducer,
  movies: moviesReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
  favoritesCount: favoritesCountReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
