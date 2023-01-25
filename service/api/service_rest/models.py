from django.db import models
from django.urls import reverse

# Create your models here.
class SaleRecordVO(models.Model):
    vin = models.CharField(max_length=200)
    import_href = models.CharField(max_length=200, unique=True, default=True)

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=200)

    def __str__(self) :
        return self.name

class Appointment(models.Model):
    vin = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    datetime = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    finished = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE
    )

    # def get_api_url(self):
    #     return reverse("api_show_appointment", kwargs={"pk": self.pk})

    def __str__(self) :
        return self.name
