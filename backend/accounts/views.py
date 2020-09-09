from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, EventSerializer, EventAttendeesSerializer
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import auth
from .models import Event, EventAttendee
import datetime
from django.views.generic import ListView
import json
from django.core import serializers
from django.http import JsonResponse
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
            return Response({
                "status": False,
                "error-message":"username field empty"
                })
        if(password == ''):
            return Response({
                "status":False,
                "error-message":"password field empty"
                })
        user_exist = User.objects.filter(username=username)
        if(user_exist):
            user = auth.authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return Response({
                    "status":True,
                    "username":user.username,
                    "first_name":user.first_name,
                    "last_name":user.last_name,
                    "email":user.email,
                    "token": AuthToken.objects.create(user)[1]
                })
            else:
                return Response({
                    "status":False,
                    "error-message":"Invalid credentials entered!"
                    })
        else:
            return Response({
                "status":False,
                "error-message":"user not found in database"
                })


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

# class EventAttendeeViewSet(viewsets.ModelViewSet):
#     serializer_class = EventAttendeesSerializer
#     queryset = EventAttendee.objects.all()

class attendAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        if request.method == 'POST':
            event_id = request.POST.get('event_id')
            user_email = request.POST.get('email')
            event = Event.objects.get(pk=event_id)
            date = datetime.datetime.now() 
            attendee = User.objects.get(email=user_email)
            room_capacity = event.room_capacity
            current_seats = event.current_seat_number
            if(current_seats < room_capacity):
                try:
                    register_seat = EventAttendee.objects.create(event=event, attendee=attendee, date_registered=date)
                    register_seat.save()
                
                    return Response({
                        'status':True,
                        'message':'success'
                    })
                except:
                    return Response({
                        'status':False,
                        'message':'There was an error whilst registering for this event.',
                    })
                
            else:
                return Response({
                    'status':'Seats filled up'
                })

class myeventsAPI(generics.GenericAPIView):
    serializer_class = EventAttendeesSerializer

    def post(self, request, format=None):
        user_email = request.POST.get('email')
        user = User.objects.get(email=user_email)
        myevents = EventAttendee.objects.filter(attendee=user.id)
        # myevents_json = serializers.serialize('json', myevents)
        return HttpResponse(myevents)