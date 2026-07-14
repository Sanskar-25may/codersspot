from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from django.db.models import Count
from .models import Course, Lesson, Enrollment
from .serializers import CourseSerializer, LessonSerializer, EnrollmentSerializer

class CourseListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        courses = Course.objects.filter(status='PUBLISHED').order_by('-createdAt')
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CourseDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, course_id):
        course = get_object_or_404(Course, id=course_id, status='PUBLISHED')
        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentEnrollmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != 'STUDENT':
            return Response({"error": "Only student accounts can enroll in courses"}, status=status.HTTP_403_FORBIDDEN)
            
        serializer = EnrollmentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            enrollment = serializer.save()
            return Response({
                "message": "Enrolled in course successfully.",
                "enrollment": EnrollmentSerializer(enrollment).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'STUDENT':
            return Response({"error": "Student credentials required to access student dashboard"}, status=status.HTTP_403_FORBIDDEN)

        enrollments = Enrollment.objects.filter(user=user).order_by('-createdAt')
        enrolled_count = enrollments.count()
        completed_count = enrollments.filter(progress=100).count()
        
        # Calculate overall avg progress
        total_progress = sum([e.progress for e in enrollments])
        avg_progress = int(total_progress / enrolled_count) if enrolled_count > 0 else 0

        # Select latest active course for continuing learning card
        active_enrollment = enrollments.first()
        active_course_data = EnrollmentSerializer(active_enrollment).data if active_enrollment else None

        return Response({
            "enrolled_count": enrolled_count,
            "completed_count": completed_count,
            "avg_progress": avg_progress,
            "study_hours_mock": round(1.2 * enrolled_count + 8.5, 1), # Dev metric
            "active_course": active_course_data,
            "enrollments": EnrollmentSerializer(enrollments, many=True).data
        }, status=status.HTTP_200_OK)

class StudentClassroomView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, course_id):
        user = request.user
        enrollment = Enrollment.objects.filter(user=user, course_id=course_id).first()
        if not enrollment:
            return Response({"error": "You must be enrolled in this course to view the classroom"}, status=status.HTTP_403_FORBIDDEN)

        course = get_object_or_404(Course, id=course_id)
        serializer = CourseSerializer(course)
        
        return Response({
            "course": serializer.data,
            "progress": enrollment.progress
        }, status=status.HTTP_200_OK)

class StudentProgressUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, course_id):
        user = request.user
        enrollment = get_object_or_404(Enrollment, user=user, course_id=course_id)
        
        new_progress = request.data.get('progress')
        if new_progress is None or not isinstance(new_progress, int) or new_progress < 0 or new_progress > 100:
            return Response({"error": "Progress must be an integer between 0 and 100"}, status=status.HTTP_400_BAD_REQUEST)
            
        enrollment.progress = new_progress
        enrollment.save()
        
        return Response({
            "message": "Classroom progress updated successfully.",
            "progress": enrollment.progress
        }, status=status.HTTP_200_OK)
