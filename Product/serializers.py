from rest_framework import serializers
from .models import Product,RatingProduct,CommentsOfTheProduct,Basket,Payment


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','name','description','avrgRating','NomberOfRating','image','prix','product_type','short_desc','user_profile')
        extra_kwargs={
            'user_profile':{
                'read_only':True
            }
        }
class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model=Basket
        fields=('id','products','user_profile','getTotal')
        extra_kwargs = {
            'user_profile': {
                'read_only': True
            }
        }
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=RatingProduct
        fields=('id','rating','product','user_profile')
        extra_kwargs={
            'user_profile':{
                'read_only':True
            }
        }
class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model=CommentsOfTheProduct
        fields=('id','comments','product','user_profile')
        extra_kwargs = {
            'user_profile': {
                'read_only': True
            }
        }

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            'id',
            'amount',
            'source',
            'timestamp','user_profile'
        )
        extra_kwargs = {
            'user_profile': {
                'read_only': True
            }
        }