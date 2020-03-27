from rest_framework import serializers
from .models import User, Profile, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['profile'] = ProfileSerializer(instance.profile_id).data
        del(response['profile_id'])
        return response