
from django.contrib.auth import authenticate, get_user_model

from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    BasePermission,
)
from rest_framework.response import Response

from .models import Company, Internship, Application, ContactMessage
from .serializers import (
    CompanySerializer,
    InternshipSerializer,
    ApplicationSerializer,
    ContactMessageSerializer,
    SignupSerializer,
    LoginSerializer,
    UserSerializer,
)

User = get_user_model()


# Public users can view; only admin can add, edit or delete.
class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True

        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.is_superuser)
        )


# SIGNUP
@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    token, _ = Token.objects.get_or_create(user=user)

    return Response(
        {
            "token": token.key,
            "user": UserSerializer(user).data,
        },
        status=status.HTTP_201_CREATED,
    )


# LOGIN
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"].lower()
    password = serializer.validated_data["password"]

    try:
        username = User.objects.get(email__iexact=email).username
    except User.DoesNotExist:
        return Response(
            {"detail": "Invalid email or password."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(
        request,
        username=username,
        password=password,
    )

    if user is None or not user.is_active:
        return Response(
            {"detail": "Invalid email or password."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "token": token.key,
        "user": UserSerializer(user).data,
    })


# CURRENT LOGGED-IN USER
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    return Response(UserSerializer(request.user).data)


# COMPANIES
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminOrReadOnly]


# INTERNSHIPS
class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer
    permission_classes = [IsAdminOrReadOnly]


# APPLICATIONS
class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve", "create"]:
            return [IsAuthenticated()]

        return [IsAdminUser()]

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return Application.objects.none()

        if user.is_staff or user.is_superuser:
            return Application.objects.all()

        return Application.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# CONTACT MESSAGES
class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]

        return [IsAdminUser()]


# LOGOUT
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    Token.objects.filter(user=request.user).delete()

    return Response({
        "detail": "Logged out successfully."
    })