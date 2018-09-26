from django.contrib.staticfiles.templatetags.staticfiles import static
from rest_framework import serializers
from django.contrib.auth.models import User
from employee.models import Employee, Contract
from department.models import Department
from department.serializers import DepartmentSerializer
from account.serializers import UserSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    department = DepartmentSerializer()
    class Meta:
        model = Employee
        fields = (
            'user',
            'title', 
            'phone', 
            'mobile', 
            'department',
            'image',
            'active',
            'created_at'
        )

class EmployeeInfoSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    image = serializers.SerializerMethodField()
    department = DepartmentSerializer()
    class Meta:
        model = Employee
        fields = [
            'user',
            'title', 
            'phone', 
            'mobile', 
            'address', 
            'department', 
            'image',
            'working_type',
            'active',
            'created_at'
        ]

    def get_image(self, obj):
        if obj.image:
            return str(obj.image.url)
        return static("ang/assets/images/nature/1.jpg")

class EmployeeContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = [
            'user',
            'wage', 
            'start', 
            'end', 
            'work_permit_no', 
            'visa_no', 
            'visa_expire'
        ]