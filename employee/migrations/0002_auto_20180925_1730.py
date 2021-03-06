# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-25 17:30
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import encrypted_fields.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('department', '0002_auto_20180925_1730'),
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=200)),
                ('mobile', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('image', models.ImageField(blank=True, null=True, upload_to=b'images/')),
                ('working_type', models.CharField(choices=[(b'MORNING', b'morning'), (b'NIGHT', b'night')], default=b'MORNING', max_length=7)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='department.Department')),
                ('uid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='info',
            name='department',
        ),
        migrations.RemoveField(
            model_name='info',
            name='uid',
        ),
        migrations.AlterField(
            model_name='contract',
            name='uid',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='contract',
            name='visa_expire',
            field=encrypted_fields.fields.EncryptedCharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='contract',
            name='visa_no',
            field=encrypted_fields.fields.EncryptedCharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='contract',
            name='wage',
            field=encrypted_fields.fields.EncryptedCharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='contract',
            name='work_permit_no',
            field=encrypted_fields.fields.EncryptedCharField(max_length=200),
        ),
        migrations.DeleteModel(
            name='Info',
        ),
    ]
