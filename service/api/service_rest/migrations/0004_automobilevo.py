# Generated by Django 4.0.3 on 2023-01-24 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_remove_appointment_date_remove_appointment_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=200)),
                ('import_href', models.CharField(default=True, max_length=200, unique=True)),
            ],
        ),
    ]
