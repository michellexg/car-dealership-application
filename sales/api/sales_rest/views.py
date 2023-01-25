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

class SaleListEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "sales_person",
        "customer",
        "automobile",
        "price"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),

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


@require_http_methods(["GET"])
def list_sales(request):
    if request.method == "GET":
        salerecord = SaleRecord.objects.all()

        return JsonResponse(
            {"salerecord": salerecord},
            encoder=SaleListEncoder,
            safe=False
        )

@require_http_methods(["POST"])
def create_salerecord(request):
    if request.method == "POST":
        content = json.loads(request.body)

        try:
            auto = content["automobile"]  #href or automobile or vin????
            automobile = AutomobileVO.objects.get(import_href=auto) # href or id or vin????
            # print(automobile)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=400
            )

        try:
            sales_person_id = content["sales_person"]  #href or automobile or vin????
            sales_person = SalesPerson.objects.get(id=sales_person_id) # href or id or vin????
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sales person"},
                status=400
            )

        try:
            customer_id = content["customer"]  #href or automobile or vin????
            customer = Customer.objects.get(id=customer_id) # href or id or vin????
            print(customer)
            # print(automobile)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status=400
            )

        salerecord = SaleRecord.objects.create(**content)
        return JsonResponse(
            salerecord,
            encoder= SaleListEncoder,
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
