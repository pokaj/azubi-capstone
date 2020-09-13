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
from django.core import serializers
from django.db.models import F


# REGISTER API
# This API allows users to create their accounts.
# It returns a status of True when account registration
# is successful
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


# LOGIN API
# This API allows users to log in to their accounts.
# 1. The user's username and password are requested for.
# 2. A check is made whether the required fields are empty or not.
# 3. A check is made whether the user has an account or not.
# 4. If the user has an account, the credentials are checked
# 5. If the credentials are correct, the user is logged in and 
#    and the call returns with a status of True and the details 
#    user. 
# 6. If credentials are wrong or the user does not exist, the 
#    respective error messages are returned.
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

# ATTEND EVENT API
# This API allows users to register to attend an event.
# The ID of the event and the email of the user are required.
# 1. After the reuired fields (event id & email) have been provided,
#    the event with that ID is retrieved from the database.
# 2. The user with that email is retrieved from the database.
# 3. The current date is placed into a variable
# 4. A check is made to determine whether the chosen event has 
#    available seats to be filled.
# 5. If a seat is available, a seat is saved for that user and 
#    a status of true and a success message is returned.
# 6. If there are no seats available, the user is notified.
class attendAPI(generics.GenericAPIView):
    serializer_class = EventAttendeesSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        if request.method == 'POST':
            event_id = request.POST.get('event_id')
            user_email = request.POST.get('email')
            event = Event.objects.get(pk=event_id)
            attendee = User.objects.get(email=user_email)
            date = datetime.datetime.now() 
            if(event.current_seat_number < event.room_capacity):
                try:
                    register_seat = EventAttendee.objects.create(event=event, attendee=attendee, date_registered=date)
                    register_seat.save()
                    Event.objects.filter(id=event.id).update(current_seat_number = F('current_seat_number') + 1)
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
                    'status':False,
                    'message':'Sorry, all seats have been taken'
                })

# MY EVENTS API
# This API returns all the events a user has registered for.
# The email of the user us required
# 1. If a user exists with that email, all events the user has 
#    has registered for are returned.
class myeventsAPI(generics.GenericAPIView):
    serializer_class = EventAttendeesSerializer

    def post(self, request, format=None):
        user_email = request.POST.get('email')
        if(user_email == ''):
            return Response({
                "status":False, 
                'message':'No email provided'
                })
        else:
            try:
                myevents = EventAttendee.objects.filter(attendee__email=user_email)
                serializer = EventAttendeesSerializer(myevents, many=True)
                return Response(serializer.data)
            except:
                return Response({
                    'status':False,
                    'message':'An error Occurred'
                    })
