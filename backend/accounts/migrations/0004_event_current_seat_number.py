# Generated by Django 3.1.1 on 2020-09-09 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20200909_0633'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='current_seat_number',
            field=models.IntegerField(null=True, verbose_name='Current Seat Number'),
        ),
    ]
