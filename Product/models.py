from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator,MinValueValidator
# Create your models here.

class Product(models.Model):
    name=models.CharField(max_length=150)
    description=models.TextField()
    image=models.ImageField()
    prix=models.FloatField()
    product_type=models.CharField(max_length=100,default="general")
    offer=models.BooleanField(default=False)
    is_in_basket=models.BooleanField(default=False)
    user_profile=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    def NomberOfRating(self):
        return len(RatingProduct.objects.filter(product=self))
    def avrgRating(self):
        sum=0
        ratings=RatingProduct.objects.filter(product=self)
        for rating in ratings:
            sum+=rating.rating
        if len(ratings>0):
            return sum/len(ratings)
        else:
            return 0
    def __str__(self):
        return self.name

class RatingProduct(models.Model):
    user_profile=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    rating=models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    def __str__(self):
        return self.user_profile.full_name
    class Meta:
        unique_together=(('user_profile','product'),)
class CommentsOfTheProduct(models.Model):
    user_profile = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    comments=models.TextField()
    def __str__(self):
        return self.user_profile.full_name
