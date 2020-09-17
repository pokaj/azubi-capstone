from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, EventSerializer, EventAttendeesSerializer, Userserializer
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
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import logout
from itertools import chain

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
# 3. A query is made to the 'EventAttendee' model to retrieve the 
#    column with the email and event passed.
# 4. If a column exists, the user has already registered to attend 
#    that event and an error message and status are returned.
# 5. If no column with those exact details are found, 
#    the current date is placed into a variable
# 6. A check is made to determine whether the chosen event has 
#    available seats to be filled.
# 7. If a seat is available, a seat is saved for that user and 
#    a status of true and a success message is returned.
# 8. If there are no seats available, the user is notified.
# 9. If a user or event does not exist, an error message and status 
#    are returned.

class attendAPI(generics.GenericAPIView):
    serializer_class = EventAttendeesSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        if request.method == 'POST':
            try:
                event_id = request.POST.get('event_id')
                user_email = request.POST.get('email')
                event = Event.objects.get(pk=event_id)
                attendee = User.objects.get(email=user_email)
                query = EventAttendee.objects.filter(
                    Q(event=event),
                    Q(attendee=attendee))
                if(query.__len__() != 0):
                    return Response({'status':False, 'message':'You have already registered for this event'})
                else:
                    query = EventAttendee.objects.filter(
                    Q(attendee=attendee),
                    Q(event_date=event.date),
                    Q(event_period=event.period))
                    if(query.__len__() != 0):
                        return Response({'status':False, 'message':'You have registered for an event running at the same period as this event'})
                    else:
                        date = datetime.datetime.now() 
                        if(event.current_seat_number < event.room_capacity):
                            try:
                                register_seat = EventAttendee.objects.create(
                                    event=event, 
                                    attendee=attendee, 
                                    event_date=event.date, 
                                    event_period=event.period, 
                                    date_registered=date
                                    )
                                register_seat.save()
                                Event.objects.filter(id=event.id).update(current_seat_number = F('current_seat_number') + 1)
                                return Response({'status':True, 'message':'Event booked'})
                            except:
                                return Response({'status':False, 'message':'An error occurred while booking event.'})
                        else:
                            return Response({'status':False, 'message':'Sorry, all seats have been booked'})
            except Event.DoesNotExist:
                return Response({'status':False, 'message':'This event does not exist'})
            except User.DoesNotExist:
                return Response({'status':False, 'message':'This user does not exist'})
            except:
                return Response({'status':False, 'message':'An error occurred'})


# UNATTEND API
# This API helps the user to unregister for an event.
# The event Id and user's email are required
# 1. After the required fields are provided, the event and 
#    user with the respective details are retrieved.
# 2. A query is made on the the EventAttendee module to find 
#    an column with the corresponding information.
# 3. After the specific column is found, it is deleted from 
#    the table. 
# 4. All exceptions are caught and handled respectfully.   

class unattendAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        if request.method == 'POST':
            try:
                event_id = request.POST.get('event_id')
                user_email = request.POST.get('email')
                event = Event.objects.get(pk=event_id)
                attendee = User.objects.get(email=user_email)
                query = EventAttendee.objects.get(
                Q(event=event),
                Q(attendee=attendee)).delete()
                Event.objects.filter(id=event.id).update(current_seat_number = F('current_seat_number') - 1)
                return Response({
                    'status':True,
                    'message':'Successfully unregistered for event'
                    })
            except ObjectDoesNotExist:
                return Response({'status':False, 'message':'You have not registered for this event.'})
            except Exception:
                return Response({'status':False, 'message':'Sorry. An error occurred'})


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
                "status": False,
                'message': 'No email provided'
            })
        else:
            try:
                myevents = EventAttendee.objects.filter(
                    attendee__email=user_email)
                serializer = EventAttendeesSerializer(myevents, many=True)
                event_count = serializer.data.__len__()

                return Response({'count':event_count, 'data':serializer.data})
            except:
                return Response({
                    'status': False,
                    'message': 'An error occurred'
                })

# class totaleventsAPI(generics.GenericAPIView):

#     def post(self, request, format=None):
#         events = Event.objects.all()
#         count = events.__len__()
#         return Response(count)


class registeredAPI(generics.GenericAPIView):
    serializer_class = EventSerializer 

    def post(self, request, format=None):
        events = Event.objects.all();
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


