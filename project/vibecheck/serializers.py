from rest_framework import serializers
from .models import Profile, Post
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'], 
        first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        profile = Profile.objects.create(user=user, display_name=(user.first_name+ " " + user.last_name))
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['profile'] = ProfileSerializer(instance.profile, many=True).data[0]
        return response


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['profile'] = ProfileSerializer(instance.profile).data
        return response