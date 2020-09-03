from .views import RegisterAPI
from django.urls import path
from .views import LoginAPI
from knox import views as knox_views

urlpatterns = [
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
]