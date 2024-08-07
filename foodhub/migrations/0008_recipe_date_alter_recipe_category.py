# Generated by Django 5.0.4 on 2024-05-09 10:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodhub', '0007_recipe_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='date',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='category',
            field=models.CharField(blank=True, choices=[('italian', 'Italian'), ('asian', 'Asian'), ('indian', 'Indian'), ('french', 'French'), ('mexican', 'Mexican'), ('japanese', 'Japanese'), ('chinese', 'Chinese'), ('mediterranean', 'Mediterranean'), ('thai', 'Thai'), ('american', 'American'), ('greek', 'Greek'), ('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner'), ('snack', 'Snack'), ('dessert', 'Dessert')], default=None, max_length=32, null=True),
        ),
    ]
