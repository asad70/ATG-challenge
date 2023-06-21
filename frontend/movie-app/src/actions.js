// actions.js

export const SET_FAVORITE_MOVIES = "SET_FAVORITE_MOVIES";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_MOVIES = "SET_MOVIES";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_FAVORITES_COUNT = "SET_FAVORITES_COUNT";
export const CLEAR_MOVIES = "CLEAR_MOVIES";
export const SET_TIMEOUT_ID = "SET_TIMEOUT_ID";

export const setFavoriteMovies = (favoriteMovies) => ({
  type: SET_FAVORITE_MOVIES,
  payload: favoriteMovies,
});

export const setSearchQuery = (searchQuery) => ({
  type: SET_SEARCH_QUERY,
  payload: searchQuery,
});

export const setMovies = (movies) => ({
  type: SET_MOVIES,
  payload: movies,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setFavoritesCount = (count) => ({
  type: SET_FAVORITES_COUNT,
  payload: count,
});

export const clearMovies = () => ({
  type: CLEAR_MOVIES,
});

export const setTimeoutId = (timeoutId) => ({
  type: SET_TIMEOUT_ID,
  payload: timeoutId,
});
