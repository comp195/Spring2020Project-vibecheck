from django.db import models
from django.core.validators import int_list_validator

# Create your models here.
class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=20)
    password = models.TextField()
    email = models.TextField()
    profile_id = models.IntegerField()


class Profile(models.Model):
    profile_id = models.IntegerField(primary_key=True)
    display_name = models.CharField(max_length=50)
    friends = models.CharField(max_length=100, validators=[int_list_validator])
    posts = models.CharField(max_length=100, validators=[int_list_validator])
    story = models.CharField(max_length=100, validators=[int_list_validator])
    audio_player = models.IntegerField()


class Post(models.Model):
    post_id = models.IntegerField(primary_key=True)
    date = models.DateTimeField()
    title = models.CharField(max_length=100)
    text_content = models.TextField()
    content = models.TextField()
    tags = models.TextField()
    comments = models.CharField(max_length=100, validators=[int_list_validator])


class Comment(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    date = models.DateTimeField()
    profile_id = models.IntegerField()
    content = models.TextField()


class Story(models.Model):
    story_id = models.IntegerField(primary_key=True)
    date = models.DateTimeField()
    content = models.TextField()


class AudioPlayer(models.Model):
    player_id = models.IntegerField(primary_key=True)
    artist = models.TextField()
    title = models.TextField()
    song = models.TextField()


class ProfileCustomization(models.Model):
    customization_id = models.IntegerField(primary_key=True)
    attr_id = models.IntegerField()
    customization = models.TextField()
