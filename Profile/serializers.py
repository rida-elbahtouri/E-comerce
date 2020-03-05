from rest_framework import serializers
from .models import UserProfile
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('email', 'password','first_name','last_name','adress','Postal_code')
        extra_kwargs={
            'password':{
                'write_only':True,
                'style': {'input_type': 'password'}
            }
        }
    def create(self, validated_data):
        user=UserProfile.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            adress=validated_data['adress'],
            Postal_code=validated_data['Postal_code'],
            password=validated_data['password']
        )
        return user

