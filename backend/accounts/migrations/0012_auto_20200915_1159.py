# Generated by Django 3.1.1 on 2020-09-15 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_eventattendee_event_period'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventattendee',
            name='event_date',
            field=models.DateField(verbose_name='Event Date'),
        ),
    ]
