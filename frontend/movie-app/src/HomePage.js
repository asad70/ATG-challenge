import React from "react";
import { connect } from "react-redux";
import {
  setFavoriteMovies,
  setSearchQuery,
  setMovies,
  setLoading,
  setError,
  clearError,
  setFavoritesCount,
  clearMovies,
  setTimeoutId,
} from "./actions";
import "./HomePage.css";

class HomePage extends React.Component {
  componentDidMount() {
    this.fetchFavoriteMovies();
    this.fetchFavoritesCount();
  }

  fetchFavoriteMovies = () => {
    const favoriteUrl = "http://127.0.0.1:8000/api/movies/";
    fetch(favoriteUrl)
      .then((response) => response.json())
      .then((data) => {
        this.props.setFavoriteMovies(data);
        this.props.setError(null);
      })
      .catch((error) => {
        this.props.setFavoriteMovies([]);
        this.props.setError("Error fetching favorite movies");
      });
  };

  isMovieInFavorites = (movie) => {
    const { favoriteMovies } = this.props;
    const movieIds = favoriteMovies.map((movie) => movie.imdbID);
    return movieIds.includes(movie.imdbID);
  };

  getMovieObjectId = (imdbID) => {
    const { favoriteMovies } = this.props;
    const movieObject = favoriteMovies.find(
      (favoriteMovie) => favoriteMovie.imdbID === imdbID
    );
    return movieObject.id;
  };

  fetchFavoritesCount = () => {
    const lengthUrl = "http://127.0.0.1:8000/api/movies/length";

    fetch(lengthUrl)
      .then((response) => response.json())
      .then((data) => {
        this.props.setFavoritesCount(data.num_movies);
      })
      .catch((error) => {
        console.error("Error fetching favorites count:", error);
      });
  };

  handleInputChange = (event) => {
    const { timeoutId } = this.props;
    clearTimeout(timeoutId);

    const searchQuery = event.target.value;
    const newTimeoutId = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        this.fetchMovies(searchQuery);
      } else {
        this.props.setMovies([]);
      }
    }, 1000);

    this.props.setSearchQuery(searchQuery);
    this.props.setTimeoutId(newTimeoutId);
  };

  fetchMovies = (searchQuery) => {
    const apiKey = "2291bfc7";
    const url = `https://www.omdbapi.com/?t=${searchQuery}&apikey=${apiKey}&type=movie`;

    this.props.setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          this.props.setMovies([data]);
          this.props.setLoading(false);
          this.props.setError(null);
        } else {
          this.props.setMovies([]);
          this.props.setLoading(false);
          this.props.setError(data.Error);
        }
      })
      .catch((error) => {
        this.props.setMovies([]);
        this.props.setLoading(false);
        this.props.setError(error.message);
      });
  };

  removeMovie = (movieId) => {
    const deleteUrl = `http://127.0.0.1:8000/api/movies/${movieId}/`;
    console.log("deleteUrl:", deleteUrl);
    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((data) => {
        console.log("Movie removed:", data);
        this.fetchFavoriteMovies(); // Update the favorite movie list after removing a movie
        this.fetchFavoritesCount(); // Update favorites count after removing movie
      })
      .catch((error) => {
        console.error("Error removing movie:", error);
      });
  };

  addToFavorites = (movie) => {
    const favoritesUrl = "http://127.0.0.1:8000/api/movies/";
    const lengthUrl = "http://127.0.0.1:8000/api/movies/length";

    fetch(lengthUrl)
      .then((response) => response.json())
      .then((data) => {
        const numMovies = data.num_movies;
        if (numMovies < 5) {
          const payload = {
            ...movie,
            userIP: data.userIP,
          };
          fetch(favoritesUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((response) => response.json())
            .then((responseData) => {
              console.log("Movie added to favorites:", responseData);
              this.props.setError(null);
              this.fetchFavoritesCount(); // Update favorites count after adding movie
              this.fetchFavoriteMovies(); // Update the favorite movie list after adding a movie
            })
            .catch((error) => {
              this.props.setError("Error adding movie to favorites");
            });
        } else {
          this.props.setError("Can't add more than 5 movies");
        }
      })
      .catch((error) => {
        this.props.setError("Error fetching favorites count");
      });
  };

  clearError = () => {
    this.props.clearError();
  };

  componentWillUnmount() {
    this.props.clearMovies();
    clearTimeout(this.props.timeoutId);
  }

  render() {
    const {
      favoriteMovies,
      searchQuery,
      movies,
      isLoading,
      error,
      favoritesCount,
    } = this.props;

    return (
      <div className="container">
        <h1 className="heading">Movie Search</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={this.handleInputChange}
            className="search-input"
          />
        </div>
        {isLoading && <p className="loading">Loading...</p>}
        {error && (
          <div className="error-popup">
            <p>{error}</p>
            <button onClick={this.clearError}>Close</button>
          </div>
        )}
        {movies.length > 0 && (
          <div className="movies-container">
            <h2 className="movie-heading">Search Results:</h2>
            <ul className="movies-list">
              {movies.map((movie) => (
                <li key={movie.imdbID} className="movie-item">
                  <div className="movie-info">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="movie-poster"
                    />
                    <div className="movie-details">
                      <p className="movie-title">Title: {movie.Title}</p>
                      <p className="movie-year">Year: {movie.Year}</p>
                    </div>
                  </div>
                  {this.isMovieInFavorites(movie) ? (
                    <button
                      onClick={() =>
                        this.removeMovie(this.getMovieObjectId(movie.imdbID))
                      }
                      className="remove-button"
                    >
                      Remove from Favorites
                    </button>
                  ) : (
                    <button
                      onClick={() => this.addToFavorites(movie)}
                      className="add-button"
                    >
                      Add to Favorites
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <hr className="divider" />
        <div className="favorites-container">
          <h2 className="favorites-heading">My Favorites:</h2>
          <p className="favorites-count">Favorites Count: {favoritesCount}</p>
          {favoriteMovies.length > 0 ? (
            <ul className="favorites-list">
              {favoriteMovies.map((movie) => (
                <li key={movie.id} className="favorite-item">
                  <div className="favorite-info">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="favorite-poster"
                    />
                    <div className="favorite-details">
                      <p className="favorite-title">Title: {movie.Title}</p>
                      <p className="favorite-year">Year: {movie.Year}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => this.removeMovie(movie.id)}
                    className="remove-button"
                  >
                    Remove from Favorites
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-favorites">No favorite movies found.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favoriteMovies: state.favoriteMovies,
    searchQuery: state.searchQuery,
    movies: state.movies,
    isLoading: state.isLoading,
    error: state.error,
    favoritesCount: state.favoritesCount,
    timeoutId: state.timeoutId,
  };
};

const mapDispatchToProps = {
  setFavoriteMovies,
  setSearchQuery,
  setMovies,
  setLoading,
  setError,
  clearError,
  setFavoritesCount,
  clearMovies,
  setTimeoutId,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
