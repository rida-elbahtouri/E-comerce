from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.
class UserProfileManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, adress="", Postal_code=0, password=None):
        if not email:
            raise ValueError('user must have an email')
        email = self.normalize_email(email)
        full_name = first_name + " " + last_name
        user = self.model(email=email, full_name=full_name, first_name=first_name, last_name=last_name, adress=adress,
                          Postal_code=Postal_code)
        user.set_password(password)
        user.save()
        return user

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)
    def create_superuser(self, email, first_name, last_name, password, adress="", Postal_code=0):
        user = self.create_user(email, first_name, last_name, adress, Postal_code, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class UserProfile(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(max_length=255,unique=True)
    first_name=models.CharField(max_length=125)
    last_name=models.CharField(max_length=125)
    full_name=models.CharField(max_length=255)
    adress=models.CharField(max_length=300,blank=True)
    Postal_code=models.IntegerField(blank=True)
    is_staff=models.BooleanField(default=False)
    is_active =models.BooleanField(default=True)

    objects=UserProfileManager()
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=["first_name","last_name"]

    def __str__(self):
        return self.email
