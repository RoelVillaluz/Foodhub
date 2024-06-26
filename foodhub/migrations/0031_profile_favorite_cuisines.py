# Generated by Django 5.0.4 on 2024-06-14 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodhub', '0030_alter_mealplan_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='favorite_cuisines',
            field=models.ManyToManyField(blank=True, limit_choices_to={'category__isnull': False}, related_name='favorite_cuisines', to='foodhub.recipe'),
        ),
    ]
