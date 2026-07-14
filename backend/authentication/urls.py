from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    RegisterView,
    VerifyOTPView,
    OnboardingView,
    UserProfileDetailView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='auth_login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='auth_refresh'),
    path('auth/verify-otp/', VerifyOTPView.as_view(), name='auth_verify_otp'),
    path('user/onboarding/', OnboardingView.as_view(), name='user_onboarding'),
    path('user/profile/', UserProfileDetailView.as_view(), name='user_profile'),
]
