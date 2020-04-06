from django.db import models
from django.contrib.auth.models import User
from django.core.validators import int_list_validator


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name="profile", on_delete=models.CASCADE)
    display_name = models.CharField(max_length=50)
    avatar_url = models.TextField(null=True, blank=True)


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    multi_media = models.TextField(null=True, blank=True)
    tags = models.TextField(null=True, blank=True)
