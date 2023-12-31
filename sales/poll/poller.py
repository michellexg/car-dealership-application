import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest import models
from sales_rest.models import AutomobileVO

def poll():
    while True:
        print('Service poller polling for data')
        try:
            url = "http://inventory-api:8000/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)
            for automobile in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    import_href = automobile["href"],
                    defaults ={
                        "model": automobile["model"]["name"],
                        "vin": automobile["vin"]
                    },

                )
            automobile = AutomobileVO.objects.all()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(30)


if __name__ == "__main__":
    poll()
