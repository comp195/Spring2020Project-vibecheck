from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.IntegerField()
    username = models.CharField(max_length=20)
    password = models.TextField()
    email = models.TextField()
    profile_id = models.IntegerField()