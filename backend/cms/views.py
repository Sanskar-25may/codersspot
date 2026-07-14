from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import SiteContent
from .serializers import SiteContentSerializer

class SiteContentView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_default_content(self, page_id):
        # Fallback dictionary values to seed database automatically if missing
        defaults = {
            "landing": {
                "headline_bold": "ship real products.",
                "headline_normal": "Build skills that",
                "subtext": "Interactive project cohorts led by expert engineers from top tech organizations.",
                "stats": [
                    {"label": "Enrolled Students", "value": "10,000+"},
                    {"label": "Satisfied Learners", "value": "98%"},
                    {"label": "Average Rating", "value": "4.9★"},
                    {"label": "Salary Increase", "value": "$34M+"}
                ],
                "features": [
                    {"title": "Project-Based Learning", "desc": "Build actual SaaS products, not just toy applications.", "col_span": "lg:col-span-2"},
                    {"title": "Live Cohorts", "desc": "Weekly interactive code reviews and Q&A sessions.", "col_span": "lg:col-span-1"},
                    {"title": "Verified Credentials", "desc": "All certificates are cryptographically verified.", "col_span": "lg:col-span-1"},
                    {"title": "Direct Placements", "desc": "Connect directly with hiring managers in our partner network.", "col_span": "lg:col-span-2"}
                ]
            },
            "about": {
                "headline": "Bridging learning and engineering.",
                "story": "CodersSpot started as a mission to make software development accessible, practical, and highly aligned with modern industry benchmarks.",
                "values": [
                    {"title": "Ship Early", "desc": "We write runnable code from day one."},
                    {"title": "Mentorship First", "desc": "Every class is run by a verified working engineer."},
                    {"title": "Community Bound", "desc": "We grow together via support networks."}
                ],
                "team": [
                    {"name": "Ananya Sharma", "role": "Founder & CEO", "avatar": "AS"},
                    {"name": "Vikram Malhotra", "role": "Head of Curriculum", "avatar": "VM"},
                    {"name": "Sarah Jenkins", "role": "Lead Faculty (AI/ML)", "avatar": "SJ"}
                ]
            },
            "placements": {
                "headline": "Our alumni ship code at top companies.",
                "stats": [
                    {"label": "Job Offer Rate", "value": "93%"},
                    {"label": "Average Hike", "value": "62%"},
                    {"label": "Top Package", "value": "44 LPA"}
                ],
                "partners": ["Google", "Razorpay", "Microsoft", "Cred", "Paytm", "Amazon"]
            },
            "testimonials": {
                "headline": "Stories from our active graduates",
                "reviews": [
                    {"name": "Rohan Deshmukh", "role": "Frontend Dev", "stars": 5, "text": "The project-based learning model helped me build confidence. I got hired in 3 weeks."},
                    {"name": "Priya Nair", "role": "Data Analyst", "stars": 5, "text": "Outstanding curriculum. The cohort reviews made me understand what clean code is."},
                    {"name": "Aman Verma", "role": "DevOps Engineer", "stars": 4, "text": "Highly practical. Setting up CI/CD pipelines in class was the game changer for me."}
                ]
            }
        }
        return defaults.get(page_id, {"headline": "Welcome to CodersSpot", "content": {}})

    def get(self, request, page_id):
        # Query Content or auto-seed defaults
        content_obj = SiteContent.objects.filter(id=page_id).first()
        if not content_obj:
            default_dict = self.get_default_content(page_id)
            content_obj = SiteContent.objects.create(id=page_id, content=default_dict)
            
        serializer = SiteContentSerializer(content_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SiteContentUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, page_id):
        # Admin restricted edit view
        if request.user.role != 'ADMIN':
            return Response({"error": "Admin credentials required to perform this action"}, status=status.HTTP_403_FORBIDDEN)
            
        content_obj = get_object_or_404(SiteContent, id=page_id)
        new_content = request.data.get('content')
        if not isinstance(new_content, dict):
            return Response({"error": "Content must be a structured JSON dictionary"}, status=status.HTTP_400_BAD_REQUEST)
            
        content_obj.content = new_content
        content_obj.save()
        
        serializer = SiteContentSerializer(content_obj)
        return Response({
            "message": "CMS content updated successfully.",
            "data": serializer.data
        }, status=status.HTTP_200_OK)
