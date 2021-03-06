# Generated by Django 4.0.4 on 2022-04-14 04:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('applications', '0002_alter_application_application_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_applications', to=settings.AUTH_USER_MODEL),
        ),
    ]
