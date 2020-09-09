from .views import RegisterAPI
from django.urls import path, include
from .views import LoginAPI
from knox import views as knox_views
from rest_framework import routers
from . import views

urlpatterns = [
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/attend', views.attendAPI.as_view(), name='attend'),
    path('api/myevents', views.myeventsAPI.as_view(), name='myevents')
]
