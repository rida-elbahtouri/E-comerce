from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import viewsets
from .models import UserProfile
from .serializers import UserSerializer
from .permissions import UpdateOwnData


# Create your views here.
class UserViewSets(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UpdateOwnData,)
class UserLogInViewSet(ObtainAuthToken):
    """create the login view"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES