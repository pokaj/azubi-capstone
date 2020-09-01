from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Account

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'firstname', 'lastname', 'email', 'username', 'password')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'firstname', 'lastname', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account.objects.create_user(
            firstname = validated_data['firstname'],
            lastname = validated_data['lastname'],
            email = validated_data['email'],
            username = validated_data['username']
            )

        return user