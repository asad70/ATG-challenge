import React from "react";

class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchFavoriteMovies();
  }

  fetchFavoriteMovies = () => {
    const favoriteUrl = "http://127.0.0.1:8000/api/movies/";

    fetch(favoriteUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ favoriteMovies: data, error: null });
      })
      .catch((error) => {
        this.setState({
          favoriteMovies: [],
          error: "Error fetching favorite movies",
        });
      });
  };

  removeMovie = (movieId) => {
    const deleteUrl = `http://127.0.0.1:8000/api/movies/${movieId}`;

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie removed:", data);
        this.fetchFavoriteMovies(); // Update the favorite movie list after removing a movie
      })
      .catch((error) => {
        console.error("Error removing movie:", error);
      });
  };

  render() {
    const { favoriteMovies, error } = this.state;

    return (
      <div>
        <h1>Favorite Movies</h1>
        {error && <p>{error}</p>}
        {favoriteMovies.length > 0 ? (
          <ul>
            {favoriteMovies.map((movie) => (
              <li key={movie.id}>
                <img src={movie.image} alt={movie.name} />
                <div>
                  <p>Name: {movie.name}</p>
                  <p>Year: {movie.year}</p>
                  <button onClick={() => this.removeMovie(movie.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite movies found.</p>
        )}
      </div>
    );
  }
}

export default FavoritePage;
