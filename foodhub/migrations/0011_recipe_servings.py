# Generated by Django 5.0.4 on 2024-05-10 00:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodhub', '0010_recipe_difficulty'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='servings',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
