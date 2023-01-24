from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from .models import SalesPerson, Customer, SaleRecord, AutomobileVO
import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "model"
    ]

class SaleListEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "sales_person",
        "employee_number",
        "customer",
        "vin",
        "price"
    ]
    encoders = {
        "vin": AutomobileVOEncoder(),
    }

class SaleRecordDetailEncoder(ModelEncoder):
    model = SaleRecord
    properies = [
        "automobile",
        "sales_person",
        "customer",
        "sales_person_number",
        "price"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
    }

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "sales_person_name",
        "employee_number"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "customer_name",
        "address",
        "phone_number"
    ]

@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        salerecord = SaleRecord.objects.all()

        return JsonResponse(
            {"salerecord": salerecord},
            encoder=SaleListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            href = content["automobile"]  #href or automobile????
            automobile = AutomobileVO.objects.get(import_href=href) # href or id????
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile href"},
                status=400
            )
        salerecord = SaleRecord.objects.create(**content)
        return JsonResponse(
            salerecord,
            encoder= SaleRecordDetailEncoder,
            safe=False
        )

@require_http_methods(["POST", "GET"])
def create_sales_person(request):
    if request.method == "POST":
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False
        )
    else:
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder,
            safe=False
        )

@require_http_methods(["POST", "GET"])
def create_customer(request):
    if request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def list_sales_history(request):
    if request.method == "GET":
        sales_history = SaleRecord.objects.all()
        return JsonResponse(
            {"sales_history": sales_history},
            encoder=SaleListEncoder,
            safe=False
        )
