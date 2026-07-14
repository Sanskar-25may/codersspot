from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'role', 'specialization', 'bio', 'createdAt', 'updatedAt']
        read_only_fields = ['id', 'createdAt', 'updatedAt']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    onboarded = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'name', 'phone_number', 'role', 'is_blocked', 'image', 'profile', 'onboarded', 'createdAt']
        read_only_fields = ['id', 'email', 'role', 'is_blocked', 'createdAt']

    def get_onboarded(self, obj):
        return hasattr(obj, 'profile')

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'phone_number']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email address already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], # Username defaults to email in our system
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            role="STUDENT" # Default role on initial registration before onboarding
        )
        return user
