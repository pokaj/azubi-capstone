from django.db import models
from django.contrib.auth.models import User
from datetime import datetime 
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser   
 
 # Model for Events
class Event(models.Model):
    name = models.CharField('Event Name', max_length=100)
    tagline = models.TextField('Tagline')
    speaker = models.CharField('Speaker', max_length=120)
    topic = models.TextField('Topic')
    location = models.CharField('Location', max_length=100)
    room_capacity = models.IntegerField('Room Capacity')
    current_seat_number = models.IntegerField('Current Seat Number', default=0)
    image = models.ImageField('Event Image', null=True, blank=True)
    date = models.DateField('Date', null=True)
    period_choices = [('m', 'Morning'),('mm', 'Midmorning'),('a', 'Afternoon')]
    period = models.CharField('Period', choices=period_choices, max_length=50, null=True)
    start_time = models.TimeField('Start Time', null=True, blank=True)
    end_time = models.TimeField('End Time', null=True, blank=True)
    attendees = models.ManyToManyField(User, through='EventAttendee', blank=True) 
    
    def __str__(self):
        return self.name
 
 # Model for user to register to attend Event
class EventAttendee(models.Model):
    event = models.ForeignKey(Event, verbose_name='Event', on_delete=models.CASCADE)
    attendee = models.ForeignKey(User, verbose_name='Attendee', on_delete=models.CASCADE)
    event_date = models.DateField('Event Date', null=False, blank=False)
    period_choices = [('m', 'Morning'),('mm', 'Midmorning'),('a', 'Afternoon')]
    event_period = models.CharField('Event Period', choices=period_choices, max_length=50, null=True)
    date_registered = models.DateField('Date Registered')


    def __str__(self):
        return self.event.name

class User(models.Model):
    first_name = models.CharField('First Name', max_length=255)
    last_name = models.CharField('Last Name', max_length=255)
    username = models.CharField('Username', max_length=255, unique=True)
    email = models.EmailField('Email', max_length=255, unique=True)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) 
    admin = models.BooleanField(default=False) 

    def get_full_name(self):
        return self.first_name + self.last_name


    def __str__(self):              
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):

        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser): 
    ...
    objects = UserManager()



# For the documentation
# (name, tagline, speaker, topic, location, room_capacity,current_seat_number,date, period_choices, period, start_time, end_time,attendees are objects of the Event model per the requirements in the sheet.)
