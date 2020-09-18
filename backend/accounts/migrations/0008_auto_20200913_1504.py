# Generated by Django 3.1.1 on 2020-09-13 15:04

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0007_auto_20200911_1812'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='attendees',
            field=models.ManyToManyField(blank=True, null=True, through='accounts.EventAttendee', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='event',
            name='end_time',
            field=models.TimeField(blank=True, null=True, verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_time',
            field=models.TimeField(blank=True, null=True, verbose_name='Start Time'),
        ),
    ]
