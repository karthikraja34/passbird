from django.urls import path, include

urlpatterns = [
    path("applications/", include(("api.v1.applications.urls", "applications"), namespace="applications")),
]
