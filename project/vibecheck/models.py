from django.db import models
from django.core.validators import int_list_validator

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    password = models.TextField()
    email = models.TextField()
    profile_id = models.IntegerField()


class Profile(models.Model):
    profile_id = models.AutoField(primary_key=True)
    display_name = models.CharField(max_length=50)
    avatar_url = models.TextField(null=True, blank=True)
    friends = models.CharField(max_length=100, validators=[int_list_validator], null=True, blank=True)
    posts = models.CharField(max_length=100, validators=[int_list_validator], null=True, blank=True)
    story = models.CharField(max_length=100, validators=[int_list_validator], null=True, blank=True)
    audio_player = models.IntegerField(null=True, blank=True)


class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    profile_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    multi_media = models.TextField(null=True, blank=True)
    tags = models.TextField(null=True, blank=True)
    comments = models.CharField(max_length=100, validators=[int_list_validator], null=True, blank=True)


class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    profile_id = models.IntegerField()
    content = models.TextField()


class Story(models.Model):
    story_id = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    content = models.TextField()
    multi_media = models.TextField()


class AudioPlayer(models.Model):
    player_id = models.AutoField(primary_key=True)
    artist = models.TextField()
    title = models.TextField()
    song = models.TextField()


class ProfileCustomization(models.Model):
    customization_id = models.AutoField(primary_key=True)
    attr_id = models.IntegerField()
    customization = models.TextField()
