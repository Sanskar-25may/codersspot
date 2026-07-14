from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import ContactMessage, CareerGuidanceForm
from .serializers import ContactMessageSerializer, CareerGuidanceFormSerializer

class ContactMessageCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Contact message submitted successfully. Our team will reach out shortly."
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CareerGuidanceCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CareerGuidanceFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Career guidance request submitted successfully. We will schedule a session."
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminLeadsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Admin restricted view
        if request.user.role != 'ADMIN':
            return Response({"error": "Admin credentials required to view lead statistics"}, status=status.HTTP_403_FORBIDDEN)
            
        contact_leads = ContactMessage.objects.all().order_by('-createdAt')
        career_leads = CareerGuidanceForm.objects.all().order_by('-createdAt')
        
        return Response({
            "contact_leads": ContactMessageSerializer(contact_leads, many=True).data,
            "career_leads": CareerGuidanceFormSerializer(career_leads, many=True).data
        }, status=status.HTTP_200_OK)
