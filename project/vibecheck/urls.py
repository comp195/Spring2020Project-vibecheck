from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', views.UserView)
router.register('profile', views.ProfileView)
router.register('post', views.PostView)


urlpatterns = [
    path('', views.index),
    path('api/', include(router.urls)),
]