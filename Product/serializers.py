from rest_framework import serializers
from .models import Product,RatingProduct,CommentsOfTheProduct


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('name','description','image','prix')

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