from __future__ import unicode_literals
from django.db import models
import django.utils.timezone as timezone


class Department(models.Model):
    name = models.CharField(max_length=200)
    text = models.TextField(null=True)
    created_at = models.DateTimeField(
            default=timezone.now)
    updated_at = models.DateTimeField(
            blank=True, null=True)

    def update(self):
        self.updated_at = timezone.now()
        self.save()

    def __unicode__(self):
        return self.name
