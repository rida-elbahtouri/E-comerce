# Generated by Django 3.0.3 on 2020-02-14 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Product', '0005_commentsoftheproduct'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_in_basket',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='offer',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='product_type',
            field=models.CharField(default='general', max_length=100),
        ),
    ]
