from rest_framework import routers
from .views import ProductViewSet
routers=routers.DefaultRouter()
routers.register('product',ProductViewSet)

from django.urls import path,include

urlpatterns = [
    path('',include(routers.urls))
]