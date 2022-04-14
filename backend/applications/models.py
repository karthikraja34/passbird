import secrets
import uuid

from django.db import models


class Application(models.Model):
    name = models.CharField("Application's Name", max_length=100)
    chain = models.CharField("Blockchain", max_length=255)
    application_id = models.CharField("Application ID", max_length=30, db_index=True)
    secret  = models.UUIDField("Application Secret", default=uuid.uuid4, editable=False)
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="applications")
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.pk:
            hex_token = secrets.token_hex(nbytes=16)
            self.application_id = secrets.token_urlsafe(16)
        super(Product, self).save(*args, **kwargs)
