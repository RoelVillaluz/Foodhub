# Generated by Django 5.0.4 on 2024-04-28 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodhub', '0002_remove_recipe_ingredients_remove_recipe_steps_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='unit_of_measurement',
            field=models.CharField(choices=[('g', 'grams'), ('kg', 'kilograms'), ('mg', 'milligrams'), ('lb', 'pounds'), ('oz', 'ounces'), ('ml', 'milliliters'), ('l', 'liters'), ('tsp', 'teaspoons'), ('tbsp', 'tablespoons'), ('cup', 'cups'), ('pt', 'pints'), ('qt', 'quarts')], default=None, max_length=32),
        ),
    ]
