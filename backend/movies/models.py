from django.db import models

class Movie(models.Model):
    Title = models.CharField(max_length=255, default="")
    Year = models.CharField(max_length=4, default="")
    Rated = models.CharField(max_length=10, default="")
    Released = models.CharField(max_length=20, default="")
    Runtime = models.CharField(max_length=10, default="")
    Genre = models.CharField(max_length=255, default="")
    Director = models.CharField(max_length=255, default="")
    Writer = models.CharField(max_length=255, default="")
    Actors = models.CharField(max_length=255, default="")
    Plot = models.TextField(default="")
    Language = models.CharField(max_length=50, default="")
    Country = models.CharField(max_length=50, default="")
    Awards = models.CharField(max_length=255, default="")
    Poster = models.TextField(default="")
    Metascore = models.CharField(max_length=5, default="")
    imdbRating = models.CharField(max_length=5, default="")
    imdbVotes = models.CharField(max_length=20, default="")
    imdbID = models.CharField(max_length=20, default="")
    Type = models.CharField(max_length=20, default="")
    DVD = models.CharField(max_length=20, default="")
    BoxOffice = models.CharField(max_length=20, default="")
    Production = models.CharField(max_length=255, default="")
    Website = models.CharField(max_length=255, default="")
    Response = models.CharField(max_length=10, default="")
    Ratings = models.JSONField(default=list)
    userIP = models.CharField(max_length=20, default="")

    def __str__(self):
        return self.title

