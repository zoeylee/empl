from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from encrypted_fields import EncryptedCharField, EncryptedDateTimeField
from django.conf import settings

class Employee(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    #user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    mobile = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    department = models.ForeignKey('department.Department',null=True, related_name='employees')
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    MORNING = 'MORNING'
    NIGHT = 'NIGHT'
    WORKING_TYPE = (
        (MORNING, 'morning'),
        (NIGHT, 'night'),
    )
    working_type = models.CharField(
        max_length=7,
        choices=WORKING_TYPE,
        default=MORNING,
    )
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(
            default=timezone.now)
    updated_at = models.DateTimeField(
            blank=True, null=True)

    def update(self):
        self.updated_at = timezone.now()
        self.save()

    def __unicode__(self):
     return self.user.username + " / " + self.title + " / " + self.phone + " / " + self.mobile

class Contract(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    #user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    wage = EncryptedCharField(max_length=200)
    start = models.DateField(auto_now=False, auto_now_add=False)
    end = models.DateField(auto_now=False, auto_now_add=False)
    work_permit_no = EncryptedCharField(max_length=200)
    visa_no = EncryptedCharField(max_length=200)
    visa_expire = EncryptedDateTimeField()
    created_at = models.DateTimeField(
            default=timezone.now)
    updated_at = models.DateTimeField(
            blank=True, null=True)

    def update(self):
        self.updated_at = timezone.now()
        self.save()
    
    def __unicode__(self):
     return self.user.username + " / " + self.wage + " / " + self.work_permit_no + " / " + self.visa_no + " / " + self.visa_expire.strftime('%Y-%m-%d')
    
    