from django.urls import path
from .views import (
    ContactMessageCreateView,
    CareerGuidanceCreateView,
    AdminLeadsListView,
)

urlpatterns = [
    path('leads/contact/', ContactMessageCreateView.as_view(), name='leads_contact_create'),
    path('leads/careers/', CareerGuidanceCreateView.as_view(), name='leads_careers_create'),
    path('admin/leads/', AdminLeadsListView.as_view(), name='admin_leads_list'),
]
