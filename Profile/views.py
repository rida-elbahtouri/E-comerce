from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import viewsets
from .models import UserProfile
from .serializers import UserSerializer
from .permissions import UpdateOwnData
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status


# Create your views here.
class UserViewSets(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UpdateOwnData,)
    def create(self, request, *args, **kwargs): # <- here i forgot self
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({'token': token.key,'id':token.user_id}, status=status.HTTP_201_CREATED, headers=headers)
class UserLogInViewSet(ObtainAuthToken):
    """create the login view"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
    def post(self, request, *args, **kwargs):
        response = super(UserLogInViewSet, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})