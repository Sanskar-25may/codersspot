import uuid
from django.db import models

class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.subject})"

class CareerGuidanceForm(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    experience = models.CharField(max_length=100, help_text="Applicant experience level bracket")
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Career Guidance lead: {self.name}"
