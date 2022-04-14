from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_cognito_jwt import JSONWebTokenAuthentication

from django.shortcuts import get_object_or_404

from applications.models import Application
from .serializers import ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        print("Hello : ", self.request.user.pk, Application.objects.filter(user=self.request.user))
        return Application.objects.filter(user=self.request.user)
