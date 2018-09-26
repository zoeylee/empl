from django.conf.urls import url

from .views import CurrentUser

urlpatterns = [
    url(r'^current$', CurrentUser.as_view()),
]