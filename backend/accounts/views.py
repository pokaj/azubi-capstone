from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import auth


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            return Response({
            "status": True
            })
        except:
            return Response({
                "message":"Error adding new user",
                "status": False
                })


# Login API
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        username = request.POST.get('username')
        password = request.POST.get('password')
        if(username == ''):
            return Response({"message":"username field empty"})
        if(password == ''):
            return Response({"message":"password field empty"})
        user_exist = User.objects.filter(username=username)
        if(user_exist):
            user = auth.authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return Response({
                     "username":user.username,
                    "first_name":user.first_name,
                    "last_name":user.last_name,
                    "email":user.email,
                    "token": AuthToken.objects.create(user)[1]
                })
            else:
                return Response({"message":"Invalid credentials entered!"})
        else:
            return Response({"message":"user not found in database"})
