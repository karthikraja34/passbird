import secrets
import uuid

from django.db import models
from users.models  import User


class Application(models.Model):
    name = models.CharField("Application's Name", max_length=100)
    chain = models.CharField("Blockchain", max_length=255)
    application_id = models.CharField("Application ID", max_length=30, db_index=True, blank=True)
    secret  = models.UUIDField("Application Secret", default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="created_applications")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.pk:
            hex_token = secrets.token_hex(nbytes=16)
            self.application_id = secrets.token_urlsafe(16)
        print("User : ", self.user,self.created)
        super(Application, self).save(*args, **kwargs)
