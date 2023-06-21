from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
            
        fields = ['id', 'Title', 'Year', 'Rated', 'Released', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Plot',
          'Language', 'Country', 'Awards', 'Poster', 'Metascore', 'imdbRating', 'imdbVotes', 'imdbID', 'Type',
          'DVD', 'BoxOffice', 'Production', 'Website', 'Response', 'Ratings', 'userIP']


    def create(self, validated_data):
        movie = Movie.objects.create(**validated_data)
        movie.save()
        return movie
    
