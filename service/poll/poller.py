import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest import models
from service_rest.models import SaleRecordVO

def get_salerecord():
    response = requests.get('http://sales-api:8000/api/sales/')
    content = json.loads(response.content)
    for record in content["salerecord"]:
        SaleRecordVO.objects.update_or_create(
            vin = record["automobile"]["vin"],
            defaults={
                "import_href": record["automobile"]["import_href"]
            }
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_salerecord()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(30)


if __name__ == "__main__":
    poll()
