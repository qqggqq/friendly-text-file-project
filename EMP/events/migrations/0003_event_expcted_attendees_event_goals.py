# Generated by Django 5.2.1 on 2025-06-10 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_category_event_department_event_location_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='expcted_attendees',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='goals',
            field=models.TextField(blank=True),
        ),
    ]
