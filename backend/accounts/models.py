from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    name = models.CharField('Event Name', max_length=100)
    tagline = models.TextField('Tagline')
    speaker = models.CharField('Speaker', max_length=100)
    topic = models.TextField('Topic')
    location = models.CharField('Location', max_length=100)
    room_capacity = models.IntegerField('Room Capacity')
    current_seat_number = models.IntegerField('Current Seat Number', default=0)
    date = models.DateField('Date', null=True)
    period_choices = [('m', 'Morning'),('mm', 'Midmorning'),('a', 'Afternoon')]
    period = models.CharField('Period', choices=period_choices, max_length=50, null=True)
    start_time = models.TimeField('Start Time')
    end_time = models.TimeField('End Time')
    attendees = models.ManyToManyField(User, through='EventAttendee')

    def __str__(self):
        return self.name

class EventAttendee(models.Model):
    event = models.ForeignKey(Event, verbose_name='Event', on_delete=models.CASCADE)
    attendee = models.ForeignKey(User, verbose_name='Attendee', on_delete=models.CASCADE)
    date_registered = models.DateField('Date Registered')
    

    def __str__(self):
        return self.event.name 
    
    

    