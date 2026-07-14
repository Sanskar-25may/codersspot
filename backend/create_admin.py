import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codersspot.settings')
django.setup()

from authentication.models import User

def create_super_admin():
    email = "codersspot97@gmail.com"
    password = "AdminPassword123!"
    
    if User.objects.filter(email=email).exists():
        print(f"User {email} already exists.")
        return
        
    user = User.objects.create_superuser(
        username=email,
        email=email,
        password=password,
        full_name="Super Admin",
        role="ADMIN"
    )
    print(f"Super Admin user {email} created successfully with password: {password}")

if __name__ == "__main__":
    create_super_admin()
