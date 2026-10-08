
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from BackendApp.views import (
    CompanyViewSet,
    InternshipViewSet,
    ApplicationViewSet,
    ContactMessageViewSet,
    signup_view,
    login_view,
    current_user_view,
    logout_view,
)

router = DefaultRouter()

router.register("companies", CompanyViewSet)
router.register("internships", InternshipViewSet)
router.register("applications", ApplicationViewSet)
router.register("contacts", ContactMessageViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/auth/signup/", signup_view),
    path("api/auth/login/", login_view),
    path("api/auth/me/", current_user_view),
    path("api/auth/logout/", logout_view),
]