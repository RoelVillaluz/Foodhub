# Generated by Django 5.0.4 on 2024-06-14 03:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('foodhub', '0034_profile_favorite_cuisines'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='favorite_cuisines',
        ),
    ]
