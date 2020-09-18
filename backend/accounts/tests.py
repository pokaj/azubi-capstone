import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .serializers import RegisterSerializer
from .models import Event
from django.test import TransactionTestCase, Client

class RegistrationTestCase(APITestCase):

    # The test below is used to test the API 
    # endpoint of an admin creating an event
    def test_eventcreation(self):
        data = {
        "name":"Christmas Party", 
        "tagline":"Come lets celebrate Jesus", 
        "speaker":"Father Christmas", 
        "topic":"The Birth", 
        "location":"Crystal Hall", 
        "room_capacity":12, 
        "current_seat_number":0, 
        "image":"", 
        "date":"", 
        "period":"m", 
        "start_time":"", 
        "end_time":""
            }
        response = self.client.post("/api/events/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class UserTestCase(APITestCase):

    # This test below is used to test the API 
    # endpoint for a user to register 
    def test_registration(self):
        data = {
            "first_name":"philip",
            "last_name":"Afriyie",
            "username":"kwabena",
            "email":"philip@gmail.com",
            "password":"abcd1234"
        }
        response = self.client.post("/api/register/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # The setup below creates a user, 
    # sets the password and saves the details 
    # to be used for further testing
    def setUp(self):
        self.user = User.objects.create(
            first_name="Kwasi",
            last_name="Boateng",
            username="kwasi",
            email="kwasi@gmail.com",
            password="abcd1234",
            )
        self.user.set_password('abcd1234')
        self.user.save()

    def test_user_created(self):
        # The test below confirms whether the user 
        # was successfully created.
        """"Users that are registered are correctly identified"""
        user = User.objects.get(first_name="Kwasi")
        self.assertEqual(user.first_name, 'Kwasi')

    def test_user_login(self):
        # The test below checks whether the registered user is 
        # able to successfully login
        """Users who are registered are able to login"""
        person = Client()
        login = person.login(username='kwasi', password='abcd1234') 
        self.assertTrue(login) 

class User_Event_Registration(APITestCase):

    # The setup below creates a user, 
    # sets the password and saves the details 
    # to be used for further testing
    def setUp(self):
        # Creating a user
        self.user = User.objects.create(
            first_name="Kwasi",
            last_name="Boateng",
            username="kwasi",
            email="kwasi@gmail.com",
            password="abcd1234",
            )
        self.user.set_password('abcd1234')
        self.user.save()

        #Creating an event
        self.event = Event.objects.create(
            name="Christmas Party", 
            tagline="Come lets celebrate Jesus", 
            speaker="Father Christmas", 
            topic="The Birth", 
            location="Crystal Hall", 
            room_capacity=12, 
            current_seat_number=0, 
            image="",  
            period="m", 
            )
        
        self.event.save()

    def test_user_event_attend(self):
        # Testin for created user to register to
        # attend the created event
        user_email = self.user.email
        event_id = self.event.id
        data = {
            "event_id":event_id,
            "email":user_email
        }
        response = self.client.post("/api/attend", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


