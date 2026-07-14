from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from .models import UserProfile
from .serializers import (
    UserRegisterSerializer,
    UserProfileSerializer,
    UserSerializer
)

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                "message": "User registered successfully.",
                "user": UserSerializer(user).data,
                "tokens": tokens
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        id_token = request.data.get('idToken')
        email = request.data.get('email')
        phone_number = request.data.get('phoneNumber')

        # DEV/MOCK MODE: If settings.DEBUG is True and no idToken is provided, 
        # let's allow verification for testing.
        if settings.DEBUG and (not id_token or id_token == "mock-token"):
            if not email:
                return Response({"error": "Email is required for verification testing"}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.filter(email=email).first()
            if not user:
                # Create a placeholder user if they signed up with Google/OTP directly
                user = User.objects.create_user(
                    username=email,
                    email=email,
                    phone_number=phone_number or "+919999999999",
                    full_name=email.split('@')[0].capitalize()
                )
            
            tokens = get_tokens_for_user(user)
            return Response({
                "message": "OTP verified successfully (Mock Mode).",
                "user": UserSerializer(user).data,
                "tokens": tokens
            }, status=status.HTTP_200_OK)

        # Production Firebase verification logic
        try:
            import firebase_admin
            from firebase_admin import auth, credentials

            if not firebase_admin._apps:
                # Read from django settings (e.g. from environment)
                firebase_cred_dict = getattr(settings, 'FIREBASE_CREDENTIALS_DICT', None)
                if firebase_cred_dict:
                    cred = credentials.Certificate(firebase_cred_dict)
                    firebase_admin.initialize_app(cred)
                else:
                    firebase_admin.initialize_app()

            decoded_token = auth.verify_id_token(id_token)
            phone = decoded_token.get('phone_number')
            firebase_email = decoded_token.get('email')

            # Find user by verified email or phone
            user = None
            if firebase_email:
                user = User.objects.filter(email=firebase_email).first()
            elif phone:
                user = User.objects.filter(phone_number=phone).first()

            if not user:
                # Create new student user if signing up via OAuth/OTP first time
                target_email = firebase_email or f"{phone.replace('+', '')}@codersspot.com"
                user = User.objects.create_user(
                    username=target_email,
                    email=target_email,
                    phone_number=phone,
                    full_name=decoded_token.get('name', 'Anonymous User')
                )
            else:
                # Link verified phone or email if not already present
                if phone and not user.phone_number:
                    user.phone_number = phone
                    user.save()

            tokens = get_tokens_for_user(user)
            return Response({
                "message": "OTP verified successfully.",
                "user": UserSerializer(user).data,
                "tokens": tokens
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Firebase authentication failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

class OnboardingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        role = request.data.get('role')
        specialization = request.data.get('specialization')
        bio = request.data.get('bio')

        if role not in ["STUDENT", "FACULTY"]:
            return Response({"error": "Role must be STUDENT or FACULTY"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if already onboarded
        if hasattr(user, 'profile'):
            return Response({"error": "User profile already onboarded"}, status=status.HTTP_400_BAD_REQUEST)

        # Update core user role
        user.role = role
        user.save()

        # Create Profile
        profile = UserProfile.objects.create(
            user=user,
            role=role,
            specialization=specialization,
            bio=bio
        )

        return Response({
            "message": "Onboarding completed successfully.",
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class UserProfileDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
