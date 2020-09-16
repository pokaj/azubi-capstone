# Generated by Django 3.1.1 on 2020-09-15 09:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_auto_20200913_1516'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventattendee',
            name='event_date',
            field=models.DateField(default=datetime.datetime.now, verbose_name='Event Date'),
        ),
        migrations.AlterField(
            model_name='event',
            name='speaker',
            field=models.CharField(max_length=120, verbose_name='Speaker'),
        ),
    ]