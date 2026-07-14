import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=50, null=True, blank=True)
    role = models.CharField(max_length=50, default="STUDENT")
    is_blocked = models.BooleanField(default=False)
    image = models.URLField(max_length=500, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        # Force username to be email if not set
        if not self.username:
            self.username = self.email
            
        # Hardcoded Admin validation check
        super_admin_email = "codersspot97@gmail.com"
        if self.email == super_admin_email:
            self.role = "ADMIN"
            self.is_staff = True
            self.is_superuser = True
        else:
            if self.role == "ADMIN":
                self.role = "STUDENT"
                self.is_staff = False
                self.is_superuser = False
        super().save(*args, **kwargs)

class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=50)
    specialization = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
