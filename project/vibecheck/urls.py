from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
from rest_framework import routers
from knox import views as knox_views

router = routers.DefaultRouter()
# router.register('users', views.UserView)
router.register('profiles', views.ProfileView, basename='Profile')
router.register('posts', views.PostView)
router.register('friendships', views.FriendshipView)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth', include('knox.urls')),
    path('api/auth/register', views.RegisterView.as_view()),
    path('api/auth/login', views.LoginView.as_view()),
    path('api/auth/user', views.UserView.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^(?:.*)/?$', views.index)]