# Generated by Django 5.2.1 on 2025-06-10 04:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_event_expcted_attendees_event_goals'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='expcted_attendees',
            new_name='expected_attendees',
        ),
    ]
