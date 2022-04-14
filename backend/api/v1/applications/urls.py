from .views import ApplicationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ApplicationViewSet, basename='applications')
urlpatterns = router.urls
