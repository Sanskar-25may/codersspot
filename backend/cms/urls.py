from django.urls import path
from .views import SiteContentView, SiteContentUpdateView

urlpatterns = [
    path('cms/<str:page_id>/', SiteContentView.as_view(), name='cms_get_content'),
    path('cms/update/<str:page_id>/', SiteContentUpdateView.as_view(), name='cms_update_content'),
]
