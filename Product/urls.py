from rest_framework import routers
from .views import ProductViewSet,RatingViewSets,CommentsViewSets,BasketViewSet,HandelPayment
from . import views
from django.urls import path,include

routers=routers.DefaultRouter()
routers.register('product',ProductViewSet)
routers.register('rating',RatingViewSets)
routers.register('comments',CommentsViewSets)
routers.register('basket',BasketViewSet)
routers.register('/Payment',HandelPayment)

urlpatterns = [
    path('',include(routers.urls)),
]