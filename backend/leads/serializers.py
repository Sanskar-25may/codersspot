from rest_framework import serializers
from .models import ContactMessage, CareerGuidanceForm

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'createdAt']
        read_only_fields = ['id', 'createdAt']

class CareerGuidanceFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerGuidanceForm
        fields = ['id', 'name', 'email', 'phone', 'experience', 'createdAt']
        read_only_fields = ['id', 'createdAt']
