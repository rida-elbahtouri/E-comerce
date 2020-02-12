from rest_framework import routers
from .views import ProductViewSet
from django.urls import path,include

routers=routers.DefaultRouter()
routers.register('product',ProductViewSet)


urlpatterns = [
    path('',include(routers.urls)),

]