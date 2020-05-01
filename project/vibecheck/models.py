from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name="profile", on_delete=models.CASCADE)
    username = models.CharField(max_length=50, unique=True)
    display_name = models.CharField(max_length=50)
    avatar_url = models.TextField(default="/static/vibecheck/img/default-avatar.png")
    join_date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
    birthday = models.DateField(default=timezone.now)
    location = models.CharField(max_length=150, blank=True)
    spotify_uri = models.TextField(default="spotify:playlist:37i9dQZF1DWYBO1MoTDhZI")


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, related_name="posts", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField(null=True)
    image = models.ImageField(null=True)


class Friendship(models.Model):
    creator = models.ForeignKey(
        User, related_name="creator", on_delete=models.CASCADE)
    friend = models.ForeignKey(
        User, related_name="friend", on_delete=models.CASCADE)