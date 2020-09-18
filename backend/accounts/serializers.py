from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event, EventAttendee

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):

        user = User.objects.create_user(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'], 
            email = validated_data['email'], 
            password = validated_data['password']
            )

        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

# Event attendee serializer 
class EventAttendeesSerializer(serializers.ModelSerializer):
    event = serializers.StringRelatedField()
    attendee = serializers.StringRelatedField()
    class Meta:
        model = EventAttendee
        fields = '__all__'



# Users serializer 
class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'