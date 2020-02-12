from rest_framework import routers
from .views import UserViewSets,UserLogInViewSet
from django.urls import path,include

routers=routers.DefaultRouter()
routers.register('profiles',UserViewSets)


urlpatterns = [
    path('login',UserLogInViewSet.as_view()),
    path('',include(routers.urls)),
]