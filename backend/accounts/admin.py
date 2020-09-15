from django.contrib import admin
from .models import Event
from .models import EventAttendee

class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'tagline', 'speaker', 'topic', 'location', 
        'room_capacity', 'current_seat_number', 'image', 'date', 'period', 'start_time', 'end_time')

class EventAttendeesAdmin(admin.ModelAdmin):
    list_display = ('event', 'attendee', 'event_date', 'event_period', 'date_registered')


admin.site.register(Event, EventAdmin)
admin.site.register(EventAttendee, EventAttendeesAdmin)