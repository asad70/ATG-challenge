from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer
from rest_framework import status
from django.http import JsonResponse


class MoviesViewList(APIView):
    def get(self, request):
        user_ip = request.META["REMOTE_ADDR"]
        movies = Movie.objects.filter(userIP=user_ip)
        serializer = MovieSerializer(movies, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        user_ip = request.META.get("REMOTE_ADDR")
        request.data["userIP"] = user_ip
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user_ip = request.META.get("REMOTE_ADDR")
        Movie.objects.filter(userIP=user_ip).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MovieViewDetail(APIView):
    def get(self, request, pk):
        movie = Movie.objects.get(id=pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        movie = Movie.objects.get(id=pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
def UserMoviesNumber(request):
    user_ip = request.META.get("REMOTE_ADDR")
    num_movies = Movie.objects.filter(userIP=user_ip).count()
    data = {
        'num_movies': num_movies,
        'userIP': user_ip
    }
    return JsonResponse(data)