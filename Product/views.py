from rest_framework import viewsets
from .models import Product,RatingProduct,CommentsOfTheProduct,Basket,Payment
from .serializers import ProductSerializer,RatingSerializer,CommentsSerializer,BasketSerializer,PaymentSerializer
from .permissions import RateProduct
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status,filters
from rest_framework.decorators import action
import stripe
from BackEnd.settings import STRIPE_SECRET_KEY
from Product.models import Basket
from Profile.models import UserProfile
import sys
sys.path.append("..")
# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes =(RateProduct,IsAuthenticatedOrReadOnly)
    filter_backends = (filters.SearchFilter,)
    search_fields=('name','description')
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Product.objects.all()
        productType = self.request.query_params.get('type', None)
        if productType is not None:
            queryset = queryset.filter(product_type=productType)
        return queryset
class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
    def get_queryset(self):
        return Basket.objects.filter(user_profile=self.request.user)
class RatingViewSets(viewsets.ModelViewSet):
    queryset = RatingProduct.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes =(RateProduct,IsAuthenticatedOrReadOnly)
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
    def get_queryset(self):
       
        queryset = RatingProduct.objects.all()
        productId = self.request.query_params.get('ID', None)
        if productId is not None:
            queryset = queryset.filter(product=productId)
        return queryset

class CommentsViewSets(viewsets.ModelViewSet):
    queryset = CommentsOfTheProduct.objects.all()
    serializer_class = CommentsSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes =(RateProduct,IsAuthenticatedOrReadOnly)
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
    def get_queryset(self):
        queryset = CommentsOfTheProduct.objects.all()
        productId = self.request.query_params.get('ID', None)
        if productId is not None:
            queryset = queryset.filter(product=productId)
        return queryset

class HandelPayment(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        stripe.api_key = STRIPE_SECRET_KEY
        try:
            stripe.Charge.create(
                amount=int(request.data.get('amount')),  # cents
                currency="usd",
                source=request.data.get('source')

            )
            return Response({'msg': 'done'}, status=status.HTTP_201_CREATED, headers=headers)
        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            print(e)
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message": "Something went wrong. You were not charged. Please try again."},
                            status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            return Response({"message": "A serious error occurred. We have been notifed."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid data received"}, status=status.HTTP_400_BAD_REQUEST)

