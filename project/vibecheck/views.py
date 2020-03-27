from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Profile, Post
from .serializers import UserSerializer, ProfileSerializer, PostSerializer

# Create your views here.
def index(request):
    return render(request, 'vibecheck/index.html')



class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


