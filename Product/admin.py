from django.contrib import admin
from .models import Product,RatingProduct,CommentsOfTheProduct,Basket,Payment
# Register your models here.
admin.site.register(Product)
admin.site.register(RatingProduct)
admin.site.register(CommentsOfTheProduct)
admin.site.register(Basket)
admin.site.register(Payment)