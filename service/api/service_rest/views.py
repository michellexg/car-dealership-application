from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, Appointment, SaleRecordVO


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
        ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties =[
        "id",
        "vin",
        "name",
        "datetime",
        "reason",
        "technician",
        "finished",
        "vip",
    ]

    encoders = {
        "technician": TechnicianListEncoder(),
    }

class AppointmentDetailEncdoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "name",
        "datetime",
        "reason",
        "technician",
        "finished",
        "vip"
    ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_appointments(request, technician_id=None):
    if request.method == "GET":

        appointments = Appointment.objects.all()


        return JsonResponse(
            {"appointments": appointments},
            encoder = AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        records = SaleRecordVO.objects.all()
        vins = []
        for record in records:
            vins.append(record.vin)

        if content["vin"] in vins:
            content["vip"] = True

        try:
            technician_id=content["technician"]
            technician=Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invald technician id"}, status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncdoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncdoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=pk)

            props = ["finished"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncdoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
