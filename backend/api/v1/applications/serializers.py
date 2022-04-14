from rest_framework import serializers

from applications.models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["name", "chain", "application_id", "secret"]
        write_only_fields  = ["name", "chain"]
