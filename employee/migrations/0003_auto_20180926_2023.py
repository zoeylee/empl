# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-26 20:23
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_auto_20180925_1730'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contract',
            old_name='uid',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='employee',
            old_name='uid',
            new_name='user',
        ),
    ]
