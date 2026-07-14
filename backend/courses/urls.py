from django.urls import path
from .views import (
    CourseListView,
    CourseDetailView,
    StudentEnrollmentView,
    StudentDashboardView,
    StudentClassroomView,
    StudentProgressUpdateView,
    FacultyDashboardView,
    FacultyCourseCreateView,
    FacultyLessonAddView,
    FacultySubmissionsQueueView,
    FacultySubmissionGradeView,
)

urlpatterns = [
    path('courses/', CourseListView.as_view(), name='course_list'),
    path('courses/<uuid:course_id>/', CourseDetailView.as_view(), name='course_detail'),
    path('student/enroll/', StudentEnrollmentView.as_view(), name='student_enroll'),
    path('student/dashboard/', StudentDashboardView.as_view(), name='student_dashboard'),
    path('student/classroom/<uuid:course_id>/', StudentClassroomView.as_view(), name='student_classroom'),
    path('student/classroom/<uuid:course_id>/progress/', StudentProgressUpdateView.as_view(), name='student_progress_update'),
    path('faculty/dashboard/', FacultyDashboardView.as_view(), name='faculty_dashboard'),
    path('faculty/courses/create/', FacultyCourseCreateView.as_view(), name='faculty_course_create'),
    path('faculty/courses/builder/lesson/', FacultyLessonAddView.as_view(), name='faculty_lesson_add'),
    path('faculty/submissions/', FacultySubmissionsQueueView.as_view(), name='faculty_submissions_queue'),
    path('faculty/submissions/grade/<uuid:submission_id>/', FacultySubmissionGradeView.as_view(), name='faculty_submission_grade'),
]
