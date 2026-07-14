from django.db import models

class SiteContent(models.Model):
    id = models.CharField(primary_key=True, max_length=255, help_text="Page ID (e.g. landing, about, placements, testimonials)")
    content = models.JSONField(default=dict, help_text="Dynamic layout copy and media URL configurations")
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id
