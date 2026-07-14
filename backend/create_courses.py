import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codersspot.settings')
django.setup()

from authentication.models import User
from courses.models import Course, Lesson

def seed_courses():
    # Fetch our Super Admin to act as default faculty
    faculty = User.objects.filter(role="ADMIN").first()
    if not faculty:
        print("Super admin user not found. Please run create_admin.py first.")
        return

    # 1. Course 1
    c1, created = Course.objects.get_or_create(
        title="Full Stack React & Next.js",
        defaults={
            "faculty": faculty,
            "description": "Master component architectures, context state managers, Tailwind CSS tokens, and static pre-rendering structures.",
            "price": 4999.00,
            "status": "PUBLISHED"
        }
    )
    if created:
        Lesson.objects.create(
            course=c1,
            title="Introduction & Scaffold Setup",
            content="Learn how to scaffold your React TS projects using Vite or Next.js layout structures.",
            videoUrl="https://www.w3schools.com/html/mov_bbb.mp4",
            sortOrder=1
        )
        Lesson.objects.create(
            course=c1,
            title="Routing & Page Navigation",
            content="Set up React Router v7 protected navigation and route boundaries.",
            videoUrl="https://www.w3schools.com/html/movie.mp4",
            sortOrder=2
        )
        print("Course 'Full Stack React & Next.js' seeded.")

    # 2. Course 2
    c2, created = Course.objects.get_or_create(
        title="System Design & Scale",
        defaults={
            "faculty": faculty,
            "description": "Explore vertical/horizontal scaling, caching grids (Redis), load balancing, and database sharding techniques.",
            "price": 6999.00,
            "status": "PUBLISHED"
        }
    )
    if created:
        Lesson.objects.create(
            course=c2,
            title="DB Sharding & Partitioning",
            content="Deep dive into partitioning keys, database replicas, and low latency caching layers.",
            videoUrl="https://www.w3schools.com/html/mov_bbb.mp4",
            sortOrder=1
        )
        print("Course 'System Design & Scale' seeded.")
        
    print("Course seeding complete.")

if __name__ == "__main__":
    seed_courses()
