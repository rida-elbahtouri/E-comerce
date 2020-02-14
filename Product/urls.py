from rest_framework import routers
from .views import ProductViewSet,RatingViewSets,CommentsViewSets
from django.urls import path,include

routers=routers.DefaultRouter()
routers.register('product',ProductViewSet)
routers.register('rating',RatingViewSets)
routers.register('comments',CommentsViewSets)

urlpatterns = [
    path('',include(routers.urls)),
]