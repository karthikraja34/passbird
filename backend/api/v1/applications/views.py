from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_cognito_jwt import JSONWebTokenAuthentication


from applications.models import Application
from .serializers import ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.validated_data["user"] = self.request.user
        serializer.validated_data["created_by"] = self.request.user
        serializer.save()
