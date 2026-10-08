from rest_framework import serializers
from .models import Company, Internship, Application, ContactMessage


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class InternshipSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        source="company.name",
        read_only=True
    )

    class Meta:
        model = Internship
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"    

from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class SignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    contact = serializers.CharField(max_length=20)
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )
        return value

    def create(self, validated_data):
        email = validated_data["email"].lower()
        name = validated_data["name"]

        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data["password"],
            first_name=name
        )

        # Contact ko abhi account model mein store nahi kiya ja raha.
        # Iske liye profile model alag se add kar sakte hain.
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="first_name", read_only=True)
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "name", "role"]

    def get_role(self, obj):
        return "admin" if obj.is_staff or obj.is_superuser else "student"    