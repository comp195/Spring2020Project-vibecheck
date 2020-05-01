from rest_framework import serializers
from .models import Profile, Post, Friendship
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_count = User.objects.filter(username=validated_data['email']).count()
        profile_count = Profile.objects.filter(username=validated_data['username']).count()
        if user_count == 0 and profile_count == 0:
            user = User.objects.create_user(validated_data['email'], validated_data['email'], validated_data['password'])
            profile = Profile.objects.create(user=user, username=validated_data['username'], display_name=validated_data['username'])
            return user
        if user_count != 0:
            raise serializers.ValidationError("User Already Exists")
        if profile_count != 0:
            raise serializers.ValidationError("Username Already Exists")


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")


class FollowRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('username', 'display_name', 'avatar_url')


# TODO figure out how to inline this
class PostProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['profile'] = PostProfileSerializer(instance.profile).data
        return response


# TODO inline
class _PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['posts'] = _PostSerializer(instance.posts, many=True).data
        return response


class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile', 'friends')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['profile'] = ProfileSerializer(instance.profile, many=True).data[0]
        return response

    def get_friends(self, instance):
        friendships = Friendship.objects.filter(creator=instance.id)
        return FriendshipSerializer(friendships, many=True).data


class FriendshipSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = Friendship
        fields = ('__all__')

    def get_profile(self, instance):
        return ProfileSerializer(Profile.objects.filter(user=instance.friend), many=True).data[0]