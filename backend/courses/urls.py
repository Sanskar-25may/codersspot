from django.urls import path
from .views import (
    CourseListView,
    CourseDetailView,
    StudentEnrollmentView,
    StudentDashboardView,
    StudentClassroomView,
    StudentProgressUpdateView,
)

urlpatterns = [
    path('courses/', CourseListView.as_view(), name='course_list'),
    path('courses/<uuid:course_id>/', CourseDetailView.as_view(), name='course_detail'),
    path('student/enroll/', StudentEnrollmentView.as_view(), name='student_enroll'),
    path('student/dashboard/', StudentDashboardView.as_view(), name='student_dashboard'),
    path('student/classroom/<uuid:course_id>/', StudentClassroomView.as_view(), name='student_classroom'),
    path('student/classroom/<uuid:course_id>/progress/', StudentProgressUpdateView.as_view(), name='student_progress_update'),
]
