from django.conf.urls import url

from .views import EmployeeList, EmployeeInfo, EmployeeContract

urlpatterns = [
    url(r'^$', EmployeeList.as_view()),
    url(r'^info/(?P<user_id>[\w-]+)$', EmployeeInfo.as_view()),
    url(r'^contract/(?P<user_id>[\w-]+)$', EmployeeContract.as_view()),
]