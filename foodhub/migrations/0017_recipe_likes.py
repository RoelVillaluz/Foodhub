# Generated by Django 5.0.4 on 2024-05-19 01:06

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodhub', '0016_alter_profile_image_alter_recipe_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='likes',
            field=models.ManyToManyField(blank=True, default=None, related_name='recipe_likes', to=settings.AUTH_USER_MODEL),
        ),
    ]
