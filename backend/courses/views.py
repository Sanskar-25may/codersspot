from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from django.db import models
from .models import Course, Lesson, Enrollment, HomeworkSubmission
from .serializers import (
    CourseSerializer, 
    LessonSerializer, 
    EnrollmentSerializer,
    HomeworkSubmissionSerializer
)

class CourseListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        courses = Course.objects.filter(status='PUBLISHED').order_by('-createdAt')
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CourseDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        if course.status != 'PUBLISHED':
            if not request.user.is_authenticated or (request.user != course.faculty and request.user.role != 'ADMIN'):
                return Response({"error": "Course not active or draft permissions restricted"}, status=status.HTTP_403_FORBIDDEN)
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

class FacultyDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role not in ["FACULTY", "ADMIN"]:
            return Response({"error": "Faculty credentials required to access this dashboard"}, status=status.HTTP_403_FORBIDDEN)

        courses = Course.objects.filter(faculty=user).order_by('-createdAt')
        courses_count = courses.count()
        
        # Calculate total enrolled students in all their courses
        enrolled_count = Enrollment.objects.filter(course__faculty=user).values('user').distinct().count()

        return Response({
            "courses_count": courses_count,
            "enrolled_count": enrolled_count,
            "revenue_mock": round(14999.0 * enrolled_count, 2), # Dev metric
            "courses": CourseSerializer(courses, many=True).data
        }, status=status.HTTP_200_OK)

class FacultyCourseCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role not in ["FACULTY", "ADMIN"]:
            return Response({"error": "Only faculty accounts can create courses"}, status=status.HTTP_403_FORBIDDEN)

        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            course = serializer.save(faculty=user, status='DRAFT')
            return Response({
                "message": "Course draft created successfully. Awaiting Admin approval.",
                "course": CourseSerializer(course).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FacultyLessonAddView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role not in ["FACULTY", "ADMIN"]:
            return Response({"error": "Only faculty accounts can build course curricula"}, status=status.HTTP_403_FORBIDDEN)

        course_id = request.data.get('course_id')
        course = get_object_or_404(Course, id=course_id, faculty=user)

        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            lesson = serializer.save(course=course)
            return Response({
                "message": "Lesson added successfully to curriculum.",
                "lesson": LessonSerializer(lesson).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FacultySubmissionsQueueView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role not in ["FACULTY", "ADMIN"]:
            return Response({"error": "Only faculty accounts can view submission queues"}, status=status.HTTP_403_FORBIDDEN)

        status_filter = request.query_params.get('status', 'PENDING')
        
        # Submissions for courses created by this faculty
        submissions = HomeworkSubmission.objects.filter(lesson__course__faculty=user).order_by('-createdAt')

        if status_filter == 'PENDING':
            submissions = submissions.filter(grade__isnull=True)
        elif status_filter == 'GRADED':
            submissions = submissions.filter(grade__isnull=False)

        serializer = HomeworkSubmissionSerializer(submissions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FacultySubmissionGradeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, submission_id):
        user = request.user
        if user.role not in ["FACULTY", "ADMIN"]:
            return Response({"error": "Only faculty accounts can query student homework"}, status=status.HTTP_403_FORBIDDEN)
        submission = get_object_or_404(HomeworkSubmission, id=submission_id, lesson__course__faculty=user)
        serializer = HomeworkSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, submission_id):
        user = request.user
        if user.role not in ["FACULTY", "ADMIN"]:
            return Response({"error": "Only faculty accounts can grade student homework"}, status=status.HTTP_403_FORBIDDEN)

        submission = get_object_or_404(HomeworkSubmission, id=submission_id, lesson__course__faculty=user)
        
        grade = request.data.get('grade')
        feedback = request.data.get('feedback', '')

        if not grade:
            return Response({"error": "Grade parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        submission.grade = grade
        submission.feedback = feedback
        submission.save()

        serializer = HomeworkSubmissionSerializer(submission)
        return Response({
            "message": "Submission graded successfully.",
            "submission": serializer.data
        }, status=status.HTTP_200_OK)

class AdminDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'ADMIN':
            return Response({"error": "Admin credentials required"}, status=status.HTTP_403_FORBIDDEN)

        total_users = User.objects.count()
        students_count = User.objects.filter(role='STUDENT').count()
        faculty_count = User.objects.filter(role='FACULTY').count()
        
        pending_courses = Course.objects.filter(status='DRAFT').order_by('-createdAt')
        pending_count = pending_courses.count()

        return Response({
            "total_users": total_users,
            "students_count": students_count,
            "faculty_count": faculty_count,
            "pending_count": pending_count,
            "pending_courses": CourseSerializer(pending_courses, many=True).data
        }, status=status.HTTP_200_OK)

class AdminCourseApprovalView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, course_id):
        user = request.user
        if user.role != 'ADMIN':
            return Response({"error": "Admin credentials required"}, status=status.HTTP_403_FORBIDDEN)

        course = get_object_or_404(Course, id=course_id)
        
        status_update = request.data.get('status')
        if status_update not in ['PUBLISHED', 'DRAFT', 'ARCHIVED']:
            return Response({"error": "Invalid course status value"}, status=status.HTTP_400_BAD_REQUEST)

        course.status = status_update
        course.save()

        return Response({
            "message": f"Course status updated to {status_update} successfully.",
            "course": CourseSerializer(course).data
        }, status=status.HTTP_200_OK)

class AdminUsersListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'ADMIN':
            return Response({"error": "Admin credentials required"}, status=status.HTTP_403_FORBIDDEN)

        users = User.objects.all().order_by('-date_joined')
        
        # Simple serialization payload
        payload = [{
            "id": str(u.id),
            "email": u.email,
            "full_name": u.full_name,
            "role": u.role,
            "isOnboarded": u.isOnboarded,
            "date_joined": u.date_joined
        } for u in users]

        return Response(payload, status=status.HTTP_200_OK)

class AdminUserRoleUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, user_id):
        user = request.user
        if user.role != 'ADMIN':
            return Response({"error": "Admin credentials required"}, status=status.HTTP_403_FORBIDDEN)

        target_user = get_object_or_404(User, id=user_id)
        new_role = request.data.get('role')
        if new_role not in ['STUDENT', 'FACULTY', 'ADMIN']:
            return Response({"error": "Invalid role value"}, status=status.HTTP_400_BAD_REQUEST)

        target_user.role = new_role
        target_user.save()

        return Response({
            "message": "User role updated successfully.",
            "user": {
                "id": str(target_user.id),
                "email": target_user.email,
                "role": target_user.role
            }
        }, status=status.HTTP_200_OK)
