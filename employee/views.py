# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from employee.models import Employee, Contract
from employee.serializers import EmployeeSerializer, EmployeeInfoSerializer, EmployeeContractSerializer

class EmployeeList(generics.ListAPIView):
    serializer_class        = EmployeeSerializer
    permission_classes      = [IsAuthenticated]
    authentication_classes  = [JSONWebTokenAuthentication]

    def get_queryset(self):
        query = self.request.GET.get("q")
        if query:
            qs = Employee.objects.filter(user__username__icontains=query)
        else:
            qs = Employee.objects.all()
        return qs


class EmployeeInfo(generics.RetrieveAPIView):
    serializer_class        = EmployeeInfoSerializer
    lookup_field            = 'user_id'
    permission_classes      = [IsAuthenticated]
    authentication_classes  = [JSONWebTokenAuthentication]

    def get_queryset(self):
        return Employee.objects.all()


class EmployeeContract(generics.RetrieveAPIView):
    serializer_class        = EmployeeContractSerializer
    lookup_field            = 'user_id'
    permission_classes      = [IsAdminUser]
    authentication_classes  = [JSONWebTokenAuthentication]

    def get_queryset(self):
        return Contract.objects.all()