# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Employee, Contract

# Register your models here.
admin.site.register(Employee)
admin.site.register(Contract)