from django.urls import path
from .views import MoviesViewList, MovieViewDetail, UserMoviesNumber

app_name = "movies"

urlpatterns = [
    # Other URL patterns in your project...
    path("movies/", MoviesViewList.as_view(), name="movies-list"),
    path("movies/length", UserMoviesNumber, name="movies-list-number"),
    path("movies/<int:pk>/", MovieViewDetail.as_view(), name="movie-detail"),
]
