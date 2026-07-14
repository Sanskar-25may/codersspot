from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Course, Lesson, Enrollment

User = get_user_model()

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'videoUrl', 'sortOrder']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    faculty_name = serializers.CharField(source='faculty.full_name', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'faculty', 'faculty_name', 'title', 'description', 'price', 'status', 'lessons', 'createdAt', 'updatedAt']
        read_only_fields = ['id', 'faculty', 'createdAt', 'updatedAt']

class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'course_id', 'progress', 'createdAt']
        read_only_fields = ['id', 'progress', 'createdAt']

    def create(self, validated_data):
        user = self.context['request'].user
        course_id = validated_data['course_id']
        course = Course.objects.get(id=course_id)
        
        enrollment, created = Enrollment.objects.get_or_create(
            user=user,
            course=course
        )
        return enrollment
