from rest_framework import viewsets
from .models import Product,RatingProduct,CommentsOfTheProduct
from .serializers import ProductSerializer,RatingSerializer,CommentsSerializer
from .permissions import RateProduct
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class RatingViewSets(viewsets.ModelViewSet):
    queryset = RatingProduct.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes =(RateProduct,IsAuthenticatedOrReadOnly)
    def create(self, request, *args, **kwargs):
        response = {'msg': 'you can not create rating like that' }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)

class CommentsViewSets(viewsets.ModelViewSet):
    queryset = CommentsOfTheProduct.objects.all()
    serializer_class = CommentsSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes =(RateProduct,IsAuthenticatedOrReadOnly)
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)