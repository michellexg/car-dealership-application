from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, default=True)
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=50)

class SalesPerson(models.Model):
    sales_person_name = models.CharField(max_length=50)
    employee_number = models.PositiveIntegerField()


class Customer(models.Model):
    customer_name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

class SaleRecord(models.Model):
    automobile = models.ForeignKey(
        "AutomobileVO",
        related_name="automobile",
        on_delete=models.CASCADE,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_person",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField()
