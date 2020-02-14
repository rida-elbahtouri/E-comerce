from django.contrib import admin
from .models import Product,RatingProduct,CommentsOfTheProduct
# Register your models here.
admin.site.register(Product)
admin.site.register(RatingProduct)
admin.site.register(CommentsOfTheProduct)
