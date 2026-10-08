
from django.db import models
from django.conf import settings


class Company(models.Model):
    name = models.CharField(max_length=150)
    industry = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    logo = models.CharField(max_length=20, blank=True)
    internships = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class Internship(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="internship_list"
    )
    title = models.CharField(max_length=150)
    description = models.TextField()
    location = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    technology = models.CharField(max_length=200)
    stipend = models.CharField(max_length=100, blank=True)
    contact = models.CharField(max_length=150, blank=True)
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0
    )

    def __str__(self):
        return self.title


class Application(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="internx_applications",
        null=True,
        blank=True
    )
    internship = models.ForeignKey(
        Internship,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    name = models.CharField(max_length=150)
    email = models.EmailField()
    contact = models.CharField(max_length=20)
    address = models.TextField()
    resume = models.URLField(blank=True)
    message = models.TextField(blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.internship.title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"