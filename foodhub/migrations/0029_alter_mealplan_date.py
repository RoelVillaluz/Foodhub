# Generated by Django 5.0.4 on 2024-06-13 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodhub', '0028_mealplan_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mealplan',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
